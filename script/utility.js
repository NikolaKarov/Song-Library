import { createArtist, createSong, deleteSong, deleteArtist } from "./api/data.js";
import page from "../node_modules/page/page.mjs";

export function popUpMessage(note, msg, color, period) {
  note.textContent = msg;
  note.style.color = color;
  note.style.display = "block";
  setTimeout(() => {
    note.style.display = "none";
  }, period);
}

export function accordionEvent(e) {
  var panel = e.target.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}

export function toggleDelete() {
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

export function toggleAdd() {
  const addBtn = document.getElementById("addBtn");
  const addElements = document.querySelectorAll(".add");

  if (addBtn.style.backgroundColor != "rgb(238, 238, 238)") {
    addBtn.style.backgroundColor = "rgb(238, 238, 238)";
    addElements.forEach((a) => (a.style.display = "none"));
  } else {
    addBtn.style.backgroundColor = "rgb(203, 245, 198)";
    addElements.forEach((a) => (a.style.display = "block"));
  }
}

export async function onArtistSubmit(e) {
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
  page.redirect("/catalogue");
}

export async function onSongSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const artist = formData.get("artist");
  const song = formData.get("song");
  const songList = e.target.previousElementSibling;
  const allSongs = [...songList.querySelectorAll("#songName")].filter((s) => s).map((x) => x.textContent);

  if (allSongs.includes(song)) {
    return alert("That song already exists.");
  }

  if (song.length == 0) {
    return alert("Please fill in the song field.");
  }

  await createSong(song, artist);
  page.redirect("/catalogue");
}

async function onDelete(e) {
  const { target } = e;

  if (target.id == "songName") {
    await deleteSong(target.dataset.id);
    target.remove();
  }

  if (target.classList.contains("accordion")) {
    await deleteArtist(target.dataset.id);
    target.nextElementSibling.remove();
    target.remove();
  }
}
