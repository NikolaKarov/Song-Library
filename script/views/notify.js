import { html, render } from "../../node_modules/lit-html/lit-html.js";

const notifyTemplate = (msg) => html` <div id="errorBox" class="notification">
  <span>${msg}</span>
</div>`;

export default async function notify(msg) {
  const notification = document.querySelector("#notifications");
  render(notifyTemplate(msg), notification);
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
