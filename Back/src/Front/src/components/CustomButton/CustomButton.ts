import $ from "jquery";
import { customButtonView } from "./CustomButtonView";
import Send from "@/images/Send.svg";
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

        //get all words from txt file
        $.get(txt, (data: string) => {
            this.words = data.split("\n").map((word: string) => word.trim());
        });

        $(this.shadowRoot).find("img").attr({
                src: Send,
                alt: "Send",
            });

        $(this.shadowRoot.querySelector("#button")).on("click", () => {
            let gridSR = $("lingo-grid");

            let formSR = $("#form")[0].shadowRoot;
            let customInput = $(formSR).find("custom-text-input");
            let value = `${customInput.val()}`;

            if (isValid(value, this.words)) {
                $.ajax({
                    url: `http://localhost:3000/guess/${value}`,
                    method: "PUT",
                    success: (data: any) => {
                        gridSR.attr(
                            "grid",
                            JSON.stringify(data.lingoGrid)
                        );

                        if (data.correct) {
                            //congrats, you guessed it!
                            this.correct(gridSR);
                        }
                        if (data.lastTurn && !data.correct) {
                            //You ran out of guesses, you lose!
                            this.incorrect(gridSR);
                        }
                    },
                    error: (err: any) => {
                        console.error(err);
                    },
                });
            } else {
                alert("Woord is niet geldig");
            }
        });
    }

    correct(gridSR: JQuery<HTMLElement>){
        confetti({
            particleCount: 200,
            spread: 70,
            ticks: 200,
            origin: {
                y: 0.6,
            },
        });
        const audio = new Audio(yay);
        audio.volume = 0.5;
        audio.play();
        audio.onended = () => {
            $.get("http://localhost:3000/game", (data) => {
                gridSR.attr(
                    "grid",
                    JSON.stringify(data.lingoGrid)
                );
            }).fail(() => {
                console.error("Can't get game data");
            });
        };
    }

    incorrect(gridSR: JQuery<HTMLElement>){
        const audio = new Audio(soldier);
        audio.volume = 0.5;
        audio.play();
        audio.onended = () => {
            $.get("http://localhost:3000/game", (data) => {
                gridSR.attr(
                    "grid",
                    JSON.stringify(data.lingoGrid)
                );
            }).fail(() => {
                console.error("Can't get game data");
            });
        };
    }
}
