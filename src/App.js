import React, { useState } from "react";
import DisplayPokemon from "./components/DisplayPokemon";
import "./App.css";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import PokemonLibrary from "./data/PokemonList.json";
import HeightBtn from "./components/buttons/HeightBtn";
import WeightBtn from "./components/buttons/WeightBtn";
import TypeButtonsMap from "./components/buttons/TypeButtonsMap";
import EvolveBtn from "./components/buttons/EvolveBtn";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  // const [history, setHistory] = useState([Array(4).fill(null)]); //4 for 4 questions. Will need up increase this number if add more questions. Holds our choices?
  // const [stepNumber, setStepNumber] = useState(0); // will show question state buttons
  const [type, setType] = useState(null);
  const [weakness, setWeakness] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [evolve, setEvolve] = useState(null);

  /* QUESTION FUNCTIONS */

  // assigns type of pokemon
  const typeAssign = (typeButtonInput) => {
    setType(typeButtonInput);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokemon) => {
        return pokemon.type.includes(`${typeButtonInput}`);
      })
    );
  };

  // assigns weakness of pokemon
  const weaknessAssign = (typeButtonInput) => {
    setWeakness(typeButtonInput);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokemon) => {
        return pokemon.weaknesses.includes(`${typeButtonInput}`);
      })
    );
  };

  // assigns height of pokemon
  const heightAssign = (minHeight, maxHeight) => {
    setHeight(maxHeight);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokemon) => {
        return (
          pokemon.height >= `${minHeight}` && pokemon.height <= `${maxHeight}`
        );
      })
    );
  };

  // assigns weight of pokemon
  const weightAssign = (minWeight, maxWeight) => {
    setWeight(maxWeight);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokemon) => {
        return (
          pokemon.weight >= `${minWeight}` && pokemon.weight <= `${maxWeight}`
        );
      })
    );
  };

  const evolveAssign = (canEvolveBoolean) => {
    //if true(yes) return pokemon that have prev/next evo. If no(false) return pokemon that do not have the property
    setEvolve(canEvolveBoolean);
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokemon) => {
        if (canEvolveBoolean === true) {
          return pokemon.prev_evolution || pokemon.next_evolution;
        } else {
          return !pokemon.prev_evolution && !pokemon.next_evolution;
        }
      })
    );
  };

  //Reset ALL data in states
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setType(null);
    setWeakness(null);
    setHeight(null);
    setWeight(null);
    setEvolve(null);
    //would need to include all other states that we declared
  }

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

  //ERROR message and my terrible button. Should be able to delete!
  // if (pokemonData.length <= 0) {
  //   return (
  //     <div>
  //       <Button onClick={reset}>There's no more Pokemon! Try again!</Button>
  //     </div>
  //   );
  // }

  /* CHILD COMPONENT VARIABLES */

  // Logs all weaknesses to pass to Btn components
  const mapWeaknesses = pokemonData.flatMap((pokeObj) => pokeObj.weaknesses);
  const uniqueWeaknessArray = [...new Set(mapWeaknesses)];

  //Get all weight and height of all pokemon, sort, and pass variable to weightBtn/heightBtn. If weight/height is within ranges, show button.
  const mapWeight = pokemonData
    .map((pokeObj) => pokeObj.weight)
    .sort((a, b) => a - b);
  const mapHeight = pokemonData
    .map((pokeObj) => pokeObj.height)
    .sort((a, b) => a - b); //do i need to sort at all?

  // Passes to child component to display Yes/No buttons which display if btns are displayed
  const mapEvolutions = pokemonData.map(
    (pokeObj) =>
      Array.isArray(pokeObj.prev_evolution) ||
      Array.isArray(pokeObj.next_evolution)
  );
  // console.log(mapEvolutions);

  // If only one pokemon is left in the array, just return that pokemon
  if (pokemonData.length === 1) {
    return (
      <div>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" onClick={reset}>
            Here's your pokemon
          </Button>
          {pokemonData.map((pokeObj) => (
            <DisplayPokemon key={pokeObj.id} pokeObj={pokeObj} />
          ))}
        </Stack>
      </div>
    );
  }

  //Logging pokemon array each render
  // console.log(pokemonData);

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <Button
        variant="contained"
        color="error"
        className="resetBtn"
        onClick={reset}
      >
        Reset
      </Button>
      {/* if type hasn't been chosen, show this question - logic is the same for other questions */}

      {/* Pokemon type? */}
      {!type && (
        <div style={{ fontSize: 50 }}>
          <strong> Select Type</strong>{" "}
          <TypeButtonsMap
            uniqueWeaknessArray={uniqueWeaknessArray}
            onClick={typeAssign}
          />
        </div>
      )}

      {/* Pokemon weakness? */}
      {type && !weakness && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Weakness</strong>
          <TypeButtonsMap
            uniqueWeaknessArray={uniqueWeaknessArray}
            onClick={weaknessAssign}
          />
        </div>
      )}

      {/* Can or can't evolve? */}
      {type && weakness && !evolve && (
        <div style={{ fontSize: 50 }}>
          <strong>Can your Pokemon Evolve?</strong>
          <EvolveBtn mapEvolutions={mapEvolutions} onClick={evolveAssign} />
        </div>
      )}

      {/* What height? */}
      {type && weakness && evolve && !height && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Height</strong>
          <HeightBtn mapHeight={mapHeight} onClick={heightAssign} />
        </div>
      )}

      {/* What weight? */}
      {type && weakness && evolve && height && !weight && (
        <div style={{ fontSize: 50 }}>
          <strong>Select Weight</strong>
          <WeightBtn mapWeight={mapWeight} onClick={weightAssign} />
        </div>
      )}

      {/* Result */}
      {type && weakness && evolve && height && weight && (
        <div style={{ fontSize: 55 }}>
          <strong>Here is your Pokemon!</strong>
        </div>
      )}
      <div className="displayPokemon">
        {pokemonData.map((pokeObj) => (
          <DisplayPokemon key={pokeObj.id} pokeObj={pokeObj} />
        ))}

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
