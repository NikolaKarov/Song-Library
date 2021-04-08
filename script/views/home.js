import { html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

const homeTemplate = (onLogin, onRegister) => html` <div>
    <div class="welcomeAndSignOut">
      <label>Welcome, stranger</label>
      <button disabled class="signoutButton">SignOut</button>
      <button disabled id="addBtn">ADD</button>
      <button disabled id="deleteBtn">DELETE</button>
    </div>
    <div class="counters">
      <label id="artistCount">Artists:7</label>
      <label id="songCount">Songs:42</label>
    </div>
  </div>
  <div class="login">
    <div class="home-page">
      <div class="homeMsg">
        <h3>Welcome to your song library.</h3>
        <h5>The app that keeps track of all the artists and song that you know.</h5>
        <h5>Use the "ADD" button to toggle the add options on & off.</h5>
        <h5>Use the "DELETE" button to toggle the delete options on & off.</h5>
        <button @click=${onLogin}>login</button>
        <button @click=${onRegister}>register</button>
      </div>
    </div>
  </div>`;

export function homePage(ctx) {
  ctx.render(homeTemplate(onLogin, onRegister));
  function onLogin() {
    page.redirect("/login");
  }
  function onRegister() {
    page.redirect("/register");
  }
}
