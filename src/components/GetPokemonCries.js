// export default function GetPokemonCries({ pokeID }) {
//   const PKMN_API_KEY =
//     "Bearer NRtdH2aconl34vnZ8EvT9hB6ZQbv9RWXcHvaCnH5QUx6eWqkVvnrDYMRScqysFA2";
//   let pokeURL = "https://api.pkmnapi.com/v1/pokemon/cries";

//   var audio = document.getElementById("myAudioElement") || new Audio();
//   // audio.src = "";
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener("load", () => {
//     console.log(xhr.response);
//   });

//   xhr.open("GET", `${pokeURL}/${pokeID}}`, true);
//   xhr.setRequestHeader("Authorization", PKMN_API_KEY);
//   xhr.setRequestHeader("Accept", "audio/wav"); // need to accept a wav
//   xhr.send(null);

//   xhr.responseType = "blob";
//   xhr.onload = function (evt) {
//     var blob = new Blob([xhr.response], { type: "audio/wav" });
//     var objectUrl = URL.createObjectURL(blob);
//     audio.src = objectUrl;
//     // Release resource when it's loaded
//     audio.onload = function (evt) {
//       URL.revokeObjectURL(objectUrl);
//     };
//     audio.play();
//   };
//   return <div></div>;
// }

// /* make it so it runs on click */
