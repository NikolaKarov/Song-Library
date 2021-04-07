import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";
import notify from "./notify.js";

const regTemplate = (onSubmit) => html` <div class="login">
  <div class="login-page">
    <div class="form">
      <form @submit=${onSubmit} class="register-form">
        <input id="registerUsername" type="text" placeholder="username" name="username" />
        <input id="registerPassword" type="password" placeholder="password" name="password" />
        <input id="repeatPassword" type="password" placeholder="repeat password" name="repass" />
        <p class="wrongCredentials"></p>
        <button class="createBtn">register</button>
        <p class="message">Already registered? <a href="/login" class="regToggle">Sign In</a></p>
      </form>
    </div>
  </div>
</div>`;

export async function registerPage(ctx) {
  ctx.render(regTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const rePass = formData.get("repass");

    if (username == "" || password == "" || rePass == "") {
      return notify("All fields are required.");
    }

    if (password != rePass) {
      return notify("Passwords don't match.");
    }

    await register(`${username}@123.123`, username, password);
    ctx.page.redirect("/catalogue");
    ctx.setNavigation();
  }
}
