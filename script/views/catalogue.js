import { html } from "../../node_modules/lit-html/lit-html.js";

import { getArtists, getSongs } from "../api/data.js";
import onSongSubmit from "../utility/songSubmit.js";
import onArtistSubmit from "../utility/artistSubmit.js";
import accordionEvent from "../utility/accordion.js";
import populateCounters from "../utility/counters.js";

const catalogueTemplate = (onArtistSubmit, onSongSubmit, accordionEvent, artists, songs) => html` <div id="accordions">
    ${artists.map((a) =>
      artistTemplate(
        accordionEvent,
        a,
        songs.filter((s) => s.artist == a.name),
        onSongSubmit
      )
    )}
  </div>
  <nav class="common">
    <form @submit=${onArtistSubmit} class="add">
      <input name="artist" type="text" id="newArtistInput" placeholder="Add artist.." />
      <button class="button" id="addArtistBtn">Add</button>
    </form>
  </nav>`;

const artistTemplate = (accordionEvent, artist, songs, onSongSubmit) => html` <button
    @click=${accordionEvent}
    class="accordion"
    data-id=${artist.objectId}
  >
    ${artist.name}
  </button>
  <div class="panel">
    <div id="songList">${songs.map(songTemplate)}</div>
    <form @submit=${onSongSubmit} class="add">
      <input name="artist" type="text" hidden .value="${artist.name}" />
      <input name="song" type="text" id="newSongInput" placeholder="Add song.." />
      <button class="songButton" id="addSongBtn">Add</button>
    </form>
  </div>`;

const songTemplate = (song) => html`<p id="songName" data-id=${song.objectId}>${song.name}</p>`;

export async function cataloguePage(ctx) {
  const [artists, songs] = await Promise.all([getArtists(), getSongs()]);

  ctx.render(catalogueTemplate(onArtistSubmit, onSongSubmit, accordionEvent, artists, songs));

  populateCounters();
}
