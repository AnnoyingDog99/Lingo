import { lingoGridView } from "./LingoGridView";
import $ from "jquery";

const template = document.createElement('template');
template.innerHTML = lingoGridView;

export class LingoGrid extends HTMLElement{
    rows: number = 5;
    columns: number = 5;
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        for(let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++) {
                $(this.shadowRoot).find(".lingo-grid").append(`<lingo-grid-cell class="lingo-grid-cell wrong-place"></lingo-grid-cell>`);
            }
        }
    }
}