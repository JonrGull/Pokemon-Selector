export default function GetPokemonCries(pokeID) {
  // I'm aware this isn't best practice, but since I'm making this project without any server-side features
  //and this key doesn't give access to any secret information, I figured this was fine.
  const PKMN_API_KEY =
    "Bearer blzBMltQM8O5UGD4uywLAxASOQRP3V81VbOAaLY53WG5f386H9WDih5C1Q0vzDjx";
  let pokeURL = "https://api.pkmnapi.com/v1/pokemon/cries";

  var audio = document.getElementById("myAudioElement") || new Audio();
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });

  xhr.open("GET", `${pokeURL}/${pokeID} `, true);
  xhr.setRequestHeader("Authorization", PKMN_API_KEY);
  xhr.setRequestHeader("Accept", "audio/wav");
  xhr.send(null);

  xhr.responseType = "blob";
  xhr.onload = function (evt) {
    var blob = new Blob([xhr.response], { type: "audio/wav" });
    var objectUrl = URL.createObjectURL(blob);
    audio.src = objectUrl;
    // Release resource when it's loaded
    audio.onload = function (evt) {
      URL.revokeObjectURL(objectUrl);
    };
    audio.play();
  };
}

/* 
NO CRY? WHY?
#6,#9,#15 , #71, gotta check 101+
*/
