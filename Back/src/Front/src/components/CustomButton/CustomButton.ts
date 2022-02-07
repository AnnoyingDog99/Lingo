import { customButtonView } from "./CustomButtonView";
import Send from "@/images/Send.svg";
import $ from "jquery";
import { isValid } from "@/../scripts";
import txt from "@/files/5-letter woorden.txt";
import yay from "@/audio/yay.mp3";
import soldier from "@/audio/soldierLingo.wav";
import confetti from "canvas-confetti";

const template = document.createElement("template");
template.innerHTML = customButtonView;

export class CustomButton extends HTMLElement {
  words: string[];
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    $.get(txt, (data: string) => {
      this.words = data.split("\n").map((word: string) => word.trim());
    });

    $(this.shadowRoot).find("img")[0].src = Send;
    $(this.shadowRoot).find("img")[0].alt = "Send";

    $(this.shadowRoot.querySelector("#button")).on("click", () => {
      //grab grid
      let gridSR = $("lingo-grid")[0]

      //@ts-ignore
      let value = $("#form")[0].shadowRoot.querySelector("custom-text-input").value ? $("#form")[0].shadowRoot.querySelector("custom-text-input").value : "";
      if(isValid(value, this.words)){
        $.ajax({
          url: `http://localhost:3000/guess/${value}`,
          method: "PUT",
          success: (data: any) => {
            gridSR.setAttribute("grid", JSON.stringify(data.lingoGrid));

            if(data.correct){
              //congrats, you guessed it!
              confetti({
                particleCount: 200,
                spread: 70,
                ticks: 200,
                origin: {
                  y: 0.6
                }
              });
              let audio = new Audio(yay);
              audio.volume = 0.5;
              audio.play();
              audio.onended = () => {
                $.get("http://localhost:3000/game", (data) => {
                  gridSR.setAttribute("grid", JSON.stringify(data.lingoGrid));
                }).fail(() => {
                  console.log("Can't get game data");
                });
              }
            }
            if(data.lastTurn && !data.correct){
              //You ran out of guesses, you lose!
              let audio = new Audio(soldier);
              audio.volume = 0.5;
              audio.play();
              audio.onended = () => {
                $.get("http://localhost:3000/game", (data) => {
                  gridSR.setAttribute("grid", JSON.stringify(data.lingoGrid));
                }).fail(() => {
                  console.log("Can't get game data");
                });
              }
            }
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }else{
        alert("Woord is niet geldig")
      }
    });
  }
}
