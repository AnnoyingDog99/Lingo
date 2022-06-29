import { lingoGridCellView } from "./LingoGridCellView";
import $ from "jquery";

const template = document.createElement("template");
template.innerHTML = lingoGridCellView;

export class LingoGridCell extends HTMLElement {
    static get observedAttributes() {
        return ["value", "type"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(
            template.content.cloneNode(true)
        );
        $(this.shadowRoot).find(".letter").text($(this).attr("value"));
        $(this.shadowRoot).find(".lingo-grid-cell div").removeClass();
        $(this.shadowRoot)
            .find(".lingo-grid-cell div")
            .addClass($(this).attr("type"));
    }

    attributeChangedCallback(
        value: string,
        oldValue: string,
        newValue: string
    ) {
        if (oldValue === newValue) return;

        if (value === "value") {
            $(this.shadowRoot).find(".letter").text($(this).attr("value"));
        } else if (value === "type") {
            $(this.shadowRoot).find(".lingo-grid-cell div").removeClass();
            $(this.shadowRoot)
                .find(".lingo-grid-cell div")
                .addClass($(this).attr("type"));
        }
    }
}
