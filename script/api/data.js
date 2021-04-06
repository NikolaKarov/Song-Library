import * as api from "./api.js";

const host = "https://parseapi.back4app.com";
api.settings.host = host;

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getArtists() {
  const username = sessionStorage.getItem("username");
  const { results } = await api.get(host + "/classes/Artists");
  return results.filter((artist) => artist.username == username);
}

export async function getSongs() {
  const username = sessionStorage.getItem("username");
  const { results } = await api.get(host + "/classes/Songs");
  return results.filter((artist) => artist.username == username);
}

export async function createArtist(name) {
  const username = sessionStorage.getItem("username");
  return await api.post(host + "/classes/Artists", { name, username });
}

export async function createSong(name, artist) {
  const username = sessionStorage.getItem("username");
  return await api.post(host + "/classes/Songs", { name, artist, username });
}

export async function deleteArtist(id) {
  return await api.del(host + "/classes/Artists/" + id);
}

export async function deleteSong(id) {
  return await api.del(host + "/classes/Songs/" + id);
}
