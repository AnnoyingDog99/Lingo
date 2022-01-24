import { customButtonView } from "./CustomButtonView";
import Send from "@/images/Send.svg";
import $ from "jquery";

const template = document.createElement("template");
template.innerHTML = customButtonView;

export class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
    $(this.shadowRoot).find("img")[0].src = Send;
    $(this.shadowRoot).find("img")[0].alt = "Send";

    $(this.shadowRoot.querySelector("#button")).on("click", () => {
      this.onClick();
      // $("lingo-grid")[0]
      //   //@ts-ignore
      //   .addGuess([
      //     { value: "T", type: "wrong" },
      //     { value: "E", type: "correct-place" },
      //     { value: "S", type: "correct" },
      //     { value: "T", type: "correct-place" },
      //     { value: "X", type: "wrong" },
      //   ]);
    });
  }

  onClick(){
    //grab value from input
    //@ts-ignore
    let value = $("#form")[0].shadowRoot.querySelector("custom-text-input").value;
    //check if value is the same as the to be guessed word
    
    

  }
}
