import page from "../../node_modules/page/page.mjs";

import { createSong } from "../api/data.js";
import notify from "../views/notify.js";

export default async function onSongSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const artist = formData.get("artist");
  const song = formData.get("song");
  const songList = e.target.previousElementSibling;
  const allSongs = [...songList.querySelectorAll("#songName")].map((x) => x.textContent);

  if (allSongs.includes(song)) {
    return notify("That song already exists.");
  }

  if (song.length == 0) {
    return notify("Please fill in the song field.");
  }

  await createSong(song, artist);
  e.target.querySelector("#newSongInput").value = "";
  page.redirect("/catalogue");
}
