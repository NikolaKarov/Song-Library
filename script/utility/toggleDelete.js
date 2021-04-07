import { deleteSong, deleteArtist } from "../api/data.js";
import populateCounters from "./counters.js";

export default function toggleDelete() {
  const deleteBtn = document.getElementById("deleteBtn");
  const artists = document.querySelectorAll(".accordion");
  const songs = document.querySelectorAll("#songName");

  if (deleteBtn.style.backgroundColor == "rgb(238, 179, 179)") {
    deleteBtn.style.backgroundColor = "rgb(238, 238, 238)";
    artists.forEach((a) => (a.textContent = a.textContent.slice(0, a.textContent.length - 2)));
    songs.forEach((a) => (a.textContent = a.textContent.slice(0, a.textContent.length - 2)));
    document.removeEventListener("click", onDelete);
  } else {
    deleteBtn.style.backgroundColor = "rgb(238, 179, 179)";
    artists.forEach((a) => (a.textContent = a.textContent + ` ✘`));
    songs.forEach((a) => (a.textContent = a.textContent + ` ✘`));
    document.addEventListener("click", onDelete);
  }
}

async function onDelete(e) {
  const { target } = e;

  if (target.id == "songName") {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await deleteSong(target.dataset.id);
      target.remove();
      populateCounters();
    }
  }

  if (target.classList.contains("accordion")) {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await deleteArtist(target.dataset.id);
      const songList = [...target.nextElementSibling.querySelector("#songList").children].map((x) => x.dataset.id);
      songList.forEach((s) => deleteSong(s));
      target.nextElementSibling.remove();
      target.remove();
      populateCounters();
    }
  }
}
