import React, { useState } from "react";
import DisplayPokemon from "./components/DisplayPokemon";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";
import HeightBtn from "./components/buttons/HeightBtn";
import WeightBtn from "./components/buttons/WeightBtn";
import TypeButtonsMap from "./components/buttons/TypeButtonsMap";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  // const [history, setHistory] = useState([Array(4).fill(null)]); //4 for 4 questions. Will need up increase this number if add more questions. Holds our choices?
  // const [stepNumber, setStepNumber] = useState(0); // will show question state buttons
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
  // assigns weakness of pokemon
  const weaknessAssign = (typeButtonInput) => {
    setWeakness(typeButtonInput);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.weaknesses.includes(`${typeButtonInput}`);
      })
    );
  };

  // assigns height of pokemon
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
  // assigns weight of pokemon
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

  /*   const jumpTo = (step) => {
    setStepNumber(step);
    setPokemonData();
  };
  const renderChoices = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
 */
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

  //Reset ALL data in states
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setType(null);
    setWeakness(null);
    setHeight(null);
    setWeight(null);
    //would need to include all other states that we declared
  }

  //Error message and my terrible button. Should be able to delete!
  if (pokemonData.length <= 0) {
    return (
      <div className="error-box">
        <button onClick={reset}>There's no more Pokemon! Try again!</button>
      </div>
    );
  }

  // if only one pokemon is left in the array, just return that pokemon
  if (pokemonData.length === 1) {
    return (
      <div className="error-box">
        <button onClick={reset}>Here's your pokemon</button>
        {pokemonData.map((pokeObj) => (
          <DisplayPokemon pokeObj={pokeObj} />
        ))}
      </div>
    );
  }

  //Logging pokemon array each render
  console.log(pokemonData);

  // Logs all weaknesses
  const mapWeaknesses = pokemonData.flatMap((pokeObj) => pokeObj.weaknesses);
  const uniqueWeaknessArray = [...new Set(mapWeaknesses)];

  //Get all weight and height of all pokemon, sort, and pass variable to weightBtn/heightBtn. If weight/height is within ranges, show button.
  const mapWeight = pokemonData
    .map((pokeObj) => pokeObj.weight)
    .sort((a, b) => a - b);
  const mapHeight = pokemonData
    .map((pokeObj) => pokeObj.height)
    .sort((a, b) => a - b); //do i need to sort at all?

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      {/* if type hasn't been chosen, show this question - logic is the same for other questions */}
      {!type && (
        <div style={{ fontSize: 50 }}>
          <strong> Select Type</strong>{" "}
          <TypeButtonsMap
            uniqueWeaknessArray={uniqueWeaknessArray}
            onClick={typeAssign}
          />
        </div>
      )}
      {type && !weakness && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Weakness</strong>
          <TypeButtonsMap
            uniqueWeaknessArray={uniqueWeaknessArray}
            onClick={weaknessAssign}
          />
        </div>
      )}
      {type && weakness && !height && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Height</strong>
          <HeightBtn mapHeight={mapHeight} onClick={heightAssign} />
        </div>
      )}
      {type && weakness && height && !weight && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Weight</strong>
          <WeightBtn mapWeight={mapWeight} onClick={weightAssign} />
        </div>
      )}
      {type && weakness && height && weight && (
        <div style={{ fontSize: 55 }}>
          <strong>Here is your Pokemon!</strong>
        </div>
      )}
      <div className="displayPokemon">
        {pokemonData.map((pokeObj) => (
          <DisplayPokemon key={pokeObj.id} pokeObj={pokeObj} />
        ))}

        <button className="resetBtn" onClick={reset}>
          Reset
        </button>
        {/* <h3>History</h3>
        {renderChoices()} */}
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

/* 

For weight and height. We need to say 
if no pokemon are under 1m or over 3m, then don't show those buttons?
*/
