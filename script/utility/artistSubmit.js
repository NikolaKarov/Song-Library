import { createArtist } from "../api/data.js";
import page from "../../node_modules/page/page.mjs";

export default async function onArtistSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const artist = formData.get("artist");
  const allArtists = [...document.querySelectorAll(".accordion")].map((x) => x.textContent);

  if (allArtists.includes(artist)) {
    return alert("That artist already exists.");
  }

  if (artist.length == 0) {
    return alert("Please fill in the artist field.");
  }

  await createArtist(artist);
  document.getElementById("newArtistInput").value = "";
  page.redirect("/catalogue");
}
