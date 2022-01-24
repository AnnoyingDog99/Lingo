import { formView } from "./FormView";

const template = document.createElement("template");
template.innerHTML = formView;

export class Form extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }
}
