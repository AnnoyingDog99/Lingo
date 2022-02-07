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

    guesses: LingoCell[][] = [];
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(
            template.content.cloneNode(true)
        );
        $.get("http://localhost:3000/game", (data) => {
            this.setAttribute("grid", JSON.stringify(data.lingoGrid));
        }).fail(() => {
            console.log("Can't get game data");
        });
    }

    generateGrid() {
        $(this.shadowRoot).find(".lingo-grid").empty();
        this.guesses.forEach((guess) => {
            guess.forEach(({ value, type }) => {
                $(this.shadowRoot)
                    .find(".lingo-grid")
                    .append(
                        `<lingo-grid-cell value="${value}" type="${type}"></lingo-grid-cell>`
                    );
            });
        });
    }

    attributeChangedCallback(
        value: string,
        oldValue: string,
        newValue: string
    ) {
        if (oldValue === newValue) return;
        this.guesses = JSON.parse(this.getAttribute("grid"));

        this.generateGrid();
    }
}
