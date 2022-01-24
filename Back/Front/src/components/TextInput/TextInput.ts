import { textInputView } from "./TextInputView";
import $ from "jquery";
import txt from "@/files/5-letter woorden.txt";

const template = document.createElement("template");
template.innerHTML = textInputView;

export class TextInput extends HTMLElement {
  minLength: number;
  maxLength: number;
  value: string;
  words: string[];

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
    this.minLength = +this.getAttribute("minlength") || 0;
    this.maxLength = +this.getAttribute("maxlength") || 0;
    $.get(txt, (data: string) => {
      this.words = data.split("\n").map((word: string) => word.trim());
    });
    let input = $(this.shadowRoot).find("input");
    input.on("input", this.onInput.bind(this));
  }

  onInput() {
    let formSR = $("#form")[0].shadowRoot;
    let textInput = $(formSR).find("#text-input");
    let buttonSR = $(formSR).find("custom-button")[0].shadowRoot;
    let button = $(buttonSR).find("#button");
    let input = $(this.shadowRoot).find("input");
    this.value = input.val() as string;

    if (
      this.value.length >= this.minLength &&
      this.value.length <= this.maxLength
    ) {
      if (this.words.includes(this.value)) {
        textInput.css("outline-color", "#00ff00");
        button.css("outline-color", "#00ff00");
      } else {
        textInput.css("outline-color", "orange");
        button.css("outline-color", "orange");
      }
      return;
    }
    textInput.css("outline-color", "red");
    button.css("outline-color", "red");
  }
}
