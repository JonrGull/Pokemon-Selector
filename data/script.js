"use strict";
// Please don't delete the 'use strict' line above

let theID, theNumber, theName;

//Connects API file!
fetch("/data/pokemonData.json") // fetch creates a Promise
  .then(function (response) {
    return response.json();
  })
  .then(function (pokemonObject) {
    // is pokemonObject okay? May be too long?
    // makes the entire object show up in the log
    console.log(pokemonObject);
    theID = pokemonObject.pokemon[0].id;
    theNumber = pokemonObject.pokemon[0].num;
    theName = pokemonObject.pokemon[0].name;

    // gets the first pokemon's details. This is an example, I don't think we can use it like this here.
    console.log(theID);
    console.log(theNumber);
    console.log(theName);
  });

// How to access data

//cleaner but idk if I want to use it yet
/* fetch("data/pokemonAPI.json")
  .then((response) => response.json()) // fetch creates a Promise
  .then((data) => console.log(data)) // makes the entire object show up in the log
  .catch((error) => console.log(error)); */

