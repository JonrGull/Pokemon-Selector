import React, { useState } from "react";
import DisplayPokemon from "./components/DisplayPokemon";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";
import TypeButtons from "./components/TypeButtons";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  const [type, setType] = useState(null);
  const [weakness, setWeakness] = useState(null);
  const [height, setHeight] = useState(null);

  // assigns type of pokemon
  const typeAssign = (typeButtonInput) => {
    setType(typeButtonInput);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes(`${typeButtonInput}`);
      })
    );
  };
  const weaknessAssign = (typeButtonInput) => {
    setWeakness(typeButtonInput);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes(`${typeButtonInput}`);
      })
    );
  };

  /* 
Put each question inside its own separate component that App pulls from to render each group of buttons and functions????
*/

  // const [languageState, SetLanguageState] = useState();

  /* React.useEffect(() => { //still works without this, so let's remove it for now.
    setPokemonData(PokemonLibrary.pokemon);
  }, []); */

  /* 
Put all these functions in useEffect?
*/

  // I believe this all works, unsure if we can use it tho?
  /*   const { typeArray = pokemonData.map((getType) => getType.type) } =
    pokemonData;
  // console.log(typeArray);

  // .map((ele) => ele) } = pokemonData;
  const filterTypeOne = (typeButtonInput) => {
    // can i use array destructuring here?
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter(() => {
        return typeArray.includes(`${typeButtonInput}`);
      })
    );
  }; */

  /* 
  Weight may be tricky because it is written as a string - kg. Maybe I can just remove the kg part from the json to make it easier. 
  Then just turn it into a number. Is there a function that can take off the kg? 
  */
  const filterWeight = (weightButtonInput) => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.weight.includes(`${weightButtonInput}`);
      })
    );
  };

  //Reset State
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setType(null);
    setWeakness(null);
    //would need to include all other states that we declared
  }

  //Error message and my terrible button. This should probably be it's own state?
  if (pokemonData.length <= 0) {
    return (
      <div className="error-box">
        <button onClick={reset}>There's no more Pokemon! Try again!</button>
      </div>
    );
  }

  //logging array each button press
  console.log(pokemonData);

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      {!type && (
        <div style={{ fontSize: 50 }}>
          <strong> Select Type</strong> <TypeButtons onClick={typeAssign} />
        </div>
      )}
      {type && !weakness && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Weakness</strong>
          <TypeButtons onClick={weaknessAssign} />
        </div>
      )}
      <div className="displayPokemon">
        {pokemonData.map((pokeObj) => (
          <DisplayPokemon pokeObj={pokeObj} />
        ))}
        <button className="resetBtn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

/* 
Move questions into app.js for now? 

        {pokemonMapper().map((pokeObj) => (
          <DisplayPokemon pokeObj={pokeObj} />
        ))}

*/

// function pokemonMapper() {
//   //Set to base data
//   //check each flag
//   let newPokemonArray = pokemonData;
//   if (flyingFilter) {
//     newPokemonArray = newPokemonArray.filter((f) => {
//       if (f.type.includes("flying")) {
//         return true;
//       }
//     });
//   }
//   if (fireFilter) {
//     newPokemonArray = newPokemonArray.filter((f) => {
//       if (f.type.includes("fire")) {
//         return true;
//       }
//     });
//   }

//   return newPokemonArray;
// }
