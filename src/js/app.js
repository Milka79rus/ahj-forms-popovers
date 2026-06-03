import "../css/style.css";
import { PopoverWidget } from "./PopoverWidget";

document.addEventListener("DOMContentLoaded", () => {
  const widget = new PopoverWidget();
  widget.init();
});
