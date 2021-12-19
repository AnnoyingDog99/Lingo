import { lingoGridCellView } from "./LingoGridCellView";

const template = document.createElement('template');
template.innerHTML = lingoGridCellView;

export class LingoGridCell extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}