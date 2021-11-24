import _ from "lodash";
import $ from "jquery";
import "./style.css";

function component() {
  const element = document.createElement("div");
  element.classList.add("hello");

  element.innerHTML = _.join(["Hello", "webpack", ":)"], " ");

  return element;
}
document.body.appendChild(component());

$(".hello").on("click", () => {
    alert("Hello world!");
});
