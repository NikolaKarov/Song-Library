export default function populateCounters(artists, songs) {
  let artistCount = artists.length;
  let songCount = songs.length;
  document.getElementById("artistCount").textContent = `Artists:${artistCount}`;
  document.getElementById("songCount").textContent = `Songs:${songCount}`;
}
