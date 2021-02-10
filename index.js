(() => {
  let tokenID = "";
  let key = "";
  const mainURL = `https://song-library-71d9c-default-rtdb.firebaseio.com/`;
  const elements = {
    accordion: () => document.getElementById("accordions"),
    artistHbs: () => document.getElementById("artist"),
    songsHbs: () => document.getElementById("songs"),
    artistCount: () => document.getElementById("artistCount"),
    songCount: () => document.getElementById("songCount"),
    addArtistBtn: () => document.getElementById("addArtistBtn"),
    newArtistInput: () => document.getElementById("newArtistInput"),
    regToggle: () => document.querySelector(".regToggle"),
    signToggle: () => document.querySelector(".signToggle"),
    registerForm: () => document.querySelector(".register-form"),
    loginForm: () => document.querySelector(".login-form"),
    loginBtn: () => document.querySelector(".loginBtn"),
    createBtn: () => document.querySelector(".createBtn"),
    loginUsername: () => document.getElementById("loginUsername"),
    loginPassword: () => document.getElementById("loginPassword"),
    msgField: () => document.getElementById("msgField"),
    artistExists: () => document.getElementById("artistExists"),
    registerUsername: () => document.getElementById("registerUsername"),
    registerPassword: () => document.getElementById("registerPassword"),
    repeatPassword: () => document.getElementById("repeatPassword"),
    welcomeAndSignOut: () => document.querySelector(".welcomeAndSignOut"),
    signoutButton: () => document.querySelector(".signoutButton"),
    deleteArtistBtn: () => document.getElementById("deleteArtistBtn"),
  };
  let artistTemplate = Handlebars.compile(elements.artistHbs().innerHTML);
  Handlebars.registerPartial("songs", elements.songsHbs().innerHTML);
  elements.regToggle().addEventListener("click", () => {
    elements.registerForm().style.display = "none";
    elements.loginForm().style.display = "block";
  });
  elements.signToggle().addEventListener("click", () => {
    elements.registerForm().style.display = "block";
    elements.loginForm().style.display = "none";
  });
  elements.loginBtn().addEventListener("click", (e) => {
    e.preventDefault();
    let { target } = e;
    let username = elements.loginUsername().value;
    let password = elements.loginPassword().value;
    firebase
      .auth()
      .signInWithEmailAndPassword(`${username}@123.123`, password)
      .then((res) => {
        document.querySelector(".login").style.display = "none";
        populateArtistsList();
        elements.welcomeAndSignOut().style.display = "block";
        document.getElementById(
          "welcomeLabel"
        ).textContent = `Welcome,${username}`;
        tokenID = username;
      })
      .catch(() => {
        let note = target.previousElementSibling;
        popUpMessage(note, "Wrong username or password.", "red", 2000);
      });
  });
  elements.createBtn().addEventListener("click", (e) => {
    e.preventDefault();
    let { target } = e;
    let note = target.previousElementSibling;
    let regUsername = elements.registerUsername().value;
    let regPassword = elements.registerPassword().value;
    let repeatPassword = elements.repeatPassword().value;
    if (
      regUsername.length == 0 ||
      regPassword.length == 0 ||
      repeatPassword.length == 0
    ) {
      popUpMessage(note, "Enter your credentials.", "red", 2000);
      return;
    }
    if (regPassword !== repeatPassword) {
      popUpMessage(note, "Passwords do not match.", "red", 2000);
      return;
    }
    if (regUsername.length < 6) {
      popUpMessage(note, "Username is too short.", "red", 2000);
      return;
    }
    if (regPassword.length < 6) {
      popUpMessage(note, "Password is too short.", "red", 2000);
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(`${regUsername}@123.123`, regPassword)
      .then(() => {
        tokenID = regUsername;
        elements.loginForm().style.display = "block";
        elements.registerForm().style.display = "none";
        popUpMessage(
          elements.msgField(),
          "Registered successfully.",
          "green",
          4000
        );
      })
      .then(() => {
        let body = JSON.stringify({
          token: regUsername,
        });
        fetch(`${mainURL}.json`, { method: "POST", body: body });
      });
  });
  elements.signoutButton().addEventListener("click", () => {
    location.reload();
  });
  elements.addArtistBtn().addEventListener("click", () => {
    let artistList =
      Array.from(document.querySelectorAll(".accordion")).map(
        (x) => x.innerText
      ) || [];
    let currentArtist = elements.newArtistInput().value;
    if (artistList.includes(currentArtist)) {
      popUpMessage(
        elements.artistExists(),
        "That artist already exists.",
        "red",
        3000
      );
      elements.newArtistInput().value = "";
      return;
    }
    if (currentArtist.length == 0) {
      return;
    }
    let newArtistBody = JSON.stringify({
      [currentArtist]: "",
    });
    fetch(`${mainURL}${key}/content.json`, {
      method: "PATCH",
      body: newArtistBody,
    })
      .then((elements.newArtistInput().value = ""))
      .then(() => {
        elements.accordion().innerHTML += artistTemplate({
          artistName: currentArtist,
          songsList: [],
        });
        accordionEvent();
        populateCounters();
        elements.newArtistInput().value = "";
      });
  });
  elements.deleteArtistBtn().addEventListener("click", () => {
    if (elements.deleteArtistBtn().style.color == "red") {
      elements.deleteArtistBtn().style.color = "black";
      document.querySelectorAll(".accordion").forEach((x) => {
        x.style.color = "#444";
      });
      document.removeEventListener("click", removeArtist);
    } else {
      elements.deleteArtistBtn().style.color = "red";
      document.querySelectorAll(".accordion").forEach((x) => {
        x.style.color = "red";
      });
      popUpMessage(
        elements.artistExists(),
        "Select the artists you want to delete.",
        "red",
        2000
      );
      document.addEventListener("click", removeArtist);
    }
  });
  document.addEventListener("click", (e) => {
    let { target } = e;
    if (Array.from(target.classList).includes("songButton")) {
      let redNote = target.parentNode.querySelector(".wrongCredentials");
      let currentArtist = target.parentNode.previousElementSibling.textContent;
      let currentSongs = Array.from(
        target.parentNode.querySelectorAll("p")
      ).map((x) => x.innerText);
      let newSong = target.previousElementSibling.value;
      target.previousElementSibling.value = "";
      if (currentSongs.includes(newSong)) {
        popUpMessage(redNote, "That song already exists.", "red", 2000);
        return;
      }
      if (newSong.length == 0) {
        popUpMessage(redNote, "Please enter song name.", "red", 2000);
        return;
      }
      currentSongs.push(newSong);
      let newSongElement = document.createElement("p");
      newSongElement.textContent = newSong;
      target.parentNode.insertBefore(newSongElement, redNote);
      let formattedList = currentSongs.map((x) => {
        return { songName: x };
      });
      let body = JSON.stringify({
        [currentArtist]: formattedList,
      });
      fetch(`${mainURL}${key}/content.json`, { method: "PATCH", body }).then(
        populateCounters
      );
    }
    if (Array.from(target.classList).includes("deleteSongBtn")) {
      if (target.style.color == "red") {
        target.style.color = "black";
        target.parentNode
          .querySelectorAll("p")
          .forEach((x) => (x.style.color = "black"));
        document.removeEventListener("click", removeSong);
      } else {
        target.style.color = "red";
        target.parentNode
          .querySelectorAll("p")
          .forEach((x) => (x.style.color = "red"));
        popUpMessage(
          target.parentNode.querySelector(".wrongCredentials"),
          "Select the songs you want to delete.",
          "red",
          2000
        );
        document.addEventListener("click", removeSong);
      }
    }
  });
  function populateArtistsList() {
    elements.accordion().innerHTML = "";
    fetch("https://song-library-71d9c-default-rtdb.firebaseio.com/.json")
      .then((res) => res.json())
      .then((input) => {
        key = Object.entries(input).filter((x) => x[1].token == tokenID)[0][0];
        let contentRaw =
          Object.values(input).filter((x) => x.token == tokenID)[0].content ||
          {};
        let contentFormated = Object.entries(contentRaw).map(
          (x) => (x = { artistName: x[0], songsList: x[1] })
        );
        let listOfArtists = "";
        contentFormated.forEach((artistAndSongs) => {
          listOfArtists += artistTemplate(artistAndSongs);
        });
        elements.accordion().innerHTML += listOfArtists;
      })
      .then(accordionEvent)
      .then(populateCounters);
  }
  function accordionEvent() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }
  function populateCounters() {
    let artistCount = document.querySelectorAll(".accordion").length;
    let songCount = document.querySelectorAll(".panel p").length;
    elements.artistCount().textContent = `Artists:${artistCount}`;
    elements.songCount().textContent = `Songs:${songCount}`;
  }
  function popUpMessage(note, msg, color, period) {
    note.style.color = color;
    note.style.display = "block";
    note.textContent = msg;
    setTimeout(() => {
      note.style.display = "none";
    }, period);
  }
  function removeArtist(e) {
    let { target } = e;
    let artistToDelete = target.textContent;
    if (Array.from(target.classList).includes("accordion")) {
      fetch(`${mainURL}${key}/content/${artistToDelete}.json`, {
        method: "DELETE",
      }).then(populateCounters);
      target.nextElementSibling.remove();
      target.remove();
    }
  }
  function removeSong(e) {
    let { target } = e;
    if (target.tagName == "P" && target.style.color == "red") {
      let currentArtist = target.parentNode.previousElementSibling.textContent;
      let songToDelete = target.textContent;
      let listOfSongs = Array.from(target.parentNode.querySelectorAll("p"))
        .map((x) => x.innerText)
        .filter((x) => x !== songToDelete);
      let formattedList = listOfSongs.map((x) => {
        return { songName: x };
      });
      let body = JSON.stringify({
        [currentArtist]: formattedList,
      });
      fetch(`${mainURL}${key}/content.json`, { method: "PATCH", body }).then(
        populateCounters
      );
      target.remove();
    }
  }
})();
