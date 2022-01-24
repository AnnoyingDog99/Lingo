import { lingoGridView } from "./LingoGridView";
import $ from "jquery";

const template = document.createElement("template");
template.innerHTML = lingoGridView;

type LingoCell = {
  /** a single letter of a word */
  value: string;
  /** determines if a letter is correct, correct but in the wrong place or just wrong */
  type: "correct" | "correct-place" | "wrong";
};

//https://itnext.io/handling-data-with-web-components-9e7e4a452e6e

export class LingoGrid extends HTMLElement {
  static get observedAttributes() {
    return ["grid"];
  }

  guesses: LingoCell[] = [];
  currentGuess: number = 0;
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
    for (let i = 0; i < 5 * 5; i++) {
      this.guesses[i] = {
        value: ".",
        type: "wrong",
      };
    }
    this.setAttribute("grid", JSON.stringify(this.guesses));
  }

  generateGrid() {
    $(this.shadowRoot).find(".lingo-grid").empty();
    this.guesses.forEach(({ value, type }) => {
      $(this.shadowRoot)
        .find(".lingo-grid")
        .append(
          `<lingo-grid-cell class="lingo-grid-cell" value="${value}" type="${type}"></lingo-grid-cell>`
        );
    });
  }

  addGuess(word: LingoCell[]) {
    if (this.currentGuess >= 5) return;
    let startCell = this.currentGuess * 5;
    let cells = $(this.shadowRoot)
      .find(".lingo-grid")
      .children()
      .slice(startCell, startCell + 5);
    cells.each((index, cell) => {
      cell.setAttribute("value", word[index].value);
      cell.setAttribute("type", word[index].type);
    });
    this.currentGuess++;
  }

  attributeChangedCallback(value: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.guesses = JSON.parse(this.getAttribute("grid"));
    this.generateGrid();
  }
}
