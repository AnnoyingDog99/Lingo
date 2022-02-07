import _ from "lodash";
import $ from "jquery";
import "./style.css";
import LingoLogo from "@/images/LingoLogo.svg";
import { LingoGrid } from "@/components/LingoGrid/LingoGrid";
import { Form } from "@/components/Form/Form";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { TextInput } from "@/components/TextInput/TextInput";
import { LingoGridCell } from "@/components/LingoGridCell/LingoGridCell";

window.customElements.define("custom-button", CustomButton);
window.customElements.define("custom-form", Form);
window.customElements.define("custom-text-input", TextInput);
window.customElements.define("lingo-grid-cell", LingoGridCell);
window.customElements.define("lingo-grid", LingoGrid);

$(`<div id="container"></div>`).appendTo("body");
$("#container").append(
    $(`<img src="${LingoLogo}" alt="Lingo Logo is stuk" id="logo"/>`)
);
$("#container").append($(`<lingo-grid grid="[]"></lingo-grid>`));
$("#container").append($(`<custom-form id="form"></custom-form>`));
