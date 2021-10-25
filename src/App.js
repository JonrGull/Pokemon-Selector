import React, { useState } from "react";
import DisplayPokemon from "./components/DisplayPokemon";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";
import TypeButtons from "./components/TypeButtons";
import HeightBtn from "./components/HeightBtn";
import WeightBtn from "./components/WeightBtn";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  const [type, setType] = useState(null);
  const [weakness, setWeakness] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

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
        return pokeType.weaknesses.includes(`${typeButtonInput}`);
      })
    );
  };

  const heightAssign = (minHeight, maxHeight) => {
    setHeight(maxHeight);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return (
          pokeType.height > `${minHeight}` && pokeType.height < `${maxHeight}`
        );
      })
    );
  };

  const weightAssign = (minWeight, maxWeight) => {
    setWeight(maxWeight);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return (
          pokeType.weight > `${minWeight}` && pokeType.weight < `${maxWeight}`
        );
      })
    );
  };

  //   const canEvolveAssign = () => {
  //   setWeight(maxWeight);
  //   setPokemonData((prevPokeArray) =>
  //     prevPokeArray.filter((pokeType) => {
  //       return (
  //         pokeType.weight > `${minWeight}` && pokeType.weight < `${maxWeight}`
  //       );
  //     })
  //   );
  // };

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

  //Reset ALL data in states
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setType(null);
    setWeakness(null);
    setHeight(null);
    setWeight(null);
    //would need to include all other states that we declared
  }

  //Error message and my terrible button.
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
      {type && weakness && !height && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Height</strong>
          <HeightBtn onClick={heightAssign} />
        </div>
      )}
      {type && weakness && height && !weight && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Weight</strong>
          <WeightBtn onClick={weightAssign} />
        </div>
      )}
      {type && weakness && height && weight && (
        <div style={{ fontSize: 55 }}>
          <strong>Here is your Pokemon!</strong>
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
