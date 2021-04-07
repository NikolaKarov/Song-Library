export default function populateCounters() {
  // let artistCount = artists.length;
  // let songCount = songs.length;
  let artistCount = [...document.querySelectorAll(".accordion")].length;
  let songCount = [...document.querySelectorAll("p")].length;
  document.getElementById("artistCount").textContent = `Artists:${artistCount}`;
  document.getElementById("songCount").textContent = `Songs:${songCount}`;
}
