import App from "../../App";

const PKMN_API_KEY = `${process.env.REACT_APP_PKMN_API_KEY}`;

export default function GetPokemonCries(pokeID) {
  if (!App.runCryOnce) {
    App.runCryOnce = true;

    let pokeURL = "https://api.pkmnapi.com/v1/pokemon/cries"; // just to keep the GET shorter

    var audio = new Audio();
    const xhr = new XMLHttpRequest();

    /*     xhr.addEventListener("load", () => {
      console.log(xhr.response); // for logging
    }); */

    xhr.open("GET", `${pokeURL}/${pokeID}`);
    xhr.setRequestHeader("Authorization", PKMN_API_KEY);
    xhr.setRequestHeader("Accept", "audio/wav");
    xhr.send(null);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // when it's done
        if (xhr.status === 200) {
          // if successful
          console.log("successful");
        } else {
          //Because some Pokemon cries do not work right now, so this sets it back to false if the request fails
          App.runCryOnce = false;
        }
      }
    };

    xhr.responseType = "blob";
    xhr.onload = function () {
      var blob = new Blob([xhr.response], { type: "audio/wav" });
      var objectUrl = URL.createObjectURL(blob);
      audio.src = objectUrl;
      // Release resource when it's loaded
      audio.onload = function () {
        URL.revokeObjectURL(objectUrl);
      };
      audio.play();
      audio.onpause = function () {
        // Waiting for it to not be playing anymore. onpause means, it has stopped playing. Once it's done playing, we can set it to false and it's ready to play again.
        App.runCryOnce = false;
      };
    };
  }
}

/* 
NO CRY? 
#6,#9,#15,#71
*/

/* 

const { data } = await axios.get(url, {
  responseType: 'arraybuffer',
  headers: {
      'Content-Type': 'audio/wav'
  }
});
const blob = new Blob([data], {
    type: 'audio/wav'
}); */
