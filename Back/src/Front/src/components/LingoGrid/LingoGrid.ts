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
        
        //get game data
        $.get("http://localhost:3000/game", (data) => {
            $(this).attr("grid", JSON.stringify(data.lingoGrid));
        }).fail(() => {
            console.log("Can't get game data");
        });
    }

    connectedCallback() {
        $(this).css({
            opacity: 0,
        })
        $(this).animate({ opacity: 1 }, 1000);
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
        _value: string,
        oldValue: string,
        newValue: string
    ) {
        if (oldValue === newValue) return;
        this.guesses = JSON.parse(newValue);
        this.generateGrid();
    }
}
