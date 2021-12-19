import { textInputView } from './TextInputView';

const template = document.createElement('template');
template.innerHTML = textInputView;

export class TextInput extends HTMLElement{
    minLength: number;
    maxLength: number;
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.minLength = +this.getAttribute("minlength") || 0;
        this.maxLength = +this.getAttribute("maxlength") || 0;
    }
}