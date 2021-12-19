import { customButtonView } from "./CustomButtonView";
import Send from "../../images/Send.svg";

const template = document.createElement('template');
template.innerHTML = customButtonView;

export class CustomButton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector("img").src = Send;
        this.shadowRoot.querySelector("img").alt = "Send";
    }
}

