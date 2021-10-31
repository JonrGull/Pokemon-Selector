import React, { useState } from "react";
import DisplayPokemon from "./components/DisplayPokemon";
import "./App.css";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
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
  const [evolve, setEvolve] = useState(null); // so null is inherently FALSE, so technically this will always be false. Which is why true works.
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const useStyles = makeStyles({
    root: {
      spacing: 8,
      direction: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const classes = useStyles();

  //#region Questions
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

  // assigns true or false upon asking if pokemon can evolve
  const evolveAssign = (canEvolve) => {
    setEvolve(canEvolve); // is it okay if this is a boolean with using !evolve?
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokemon) => {
        if (canEvolve) {
          return pokemon.prev_evolution || pokemon.next_evolution;
        } else {
          return !pokemon.prev_evolution && !pokemon.next_evolution;
        }
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
  //#endregion

  //Reset ALL data in states
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setType(null);
    setWeakness(null);
    setEvolve(null);
    setHeight(null);
    setWeight(null);

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

  //ERROR message and my terrible button. Should be able to delete soon!
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
    .sort((a, b) => a - b);

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
        <Stack className={classes.root}>
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
  console.log(pokemonData);

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <Button variant="contained" color="error" onClick={reset}>
        Reset
      </Button>
      {/* if type hasn't been chosen, show this question - logic is the same for other questions */}

      {/* Pokemon type? */}
      <Stack className="classes.root">
        {type === null && (
          <div style={{ fontSize: 50 }}>
            <strong> Select Type</strong>{" "}
            <TypeButtonsMap
              uniqueWeaknessArray={uniqueWeaknessArray}
              onClick={typeAssign}
            />
          </div>
        )}

        {/* Pokemon weakness? */}
        {type !== null && weakness === null && (
          <div style={{ fontSize: 50 }}>
            <strong>Select Weakness</strong>
            <TypeButtonsMap
              uniqueWeaknessArray={uniqueWeaknessArray}
              onClick={weaknessAssign}
            />
          </div>
        )}

        {/* Can or can't evolve? */}
        {type !== null && weakness !== null && evolve === null && (
          <div style={{ fontSize: 50 }}>
            <strong>Can your Pokemon Evolve?</strong>
            <EvolveBtn mapEvolutions={mapEvolutions} onClick={evolveAssign} />
          </div>
        )}

        {/* What height? */}
        {type !== null &&
          weakness !== null &&
          evolve !== null &&
          height === null && (
            <div style={{ fontSize: 50 }}>
              <strong>Select Height</strong>
              <HeightBtn mapHeight={mapHeight} onClick={heightAssign} />
            </div>
          )}

        {/* What weight? */}
        {type !== null &&
          weakness !== null &&
          evolve !== null &&
          height !== null &&
          weight === null && (
            <div style={{ fontSize: 50 }}>
              <strong>Select Weight</strong>
              <WeightBtn mapWeight={mapWeight} onClick={weightAssign} />
            </div>
          )}

        {/* Result */}
        {type !== null &&
          weakness !== null &&
          evolve !== null &&
          height !== null &&
          weight !== null && (
            <div style={{ fontSize: 55 }}>
              <strong>Here is your Pokemon!</strong>
            </div>
          )}
      </Stack>
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
ERROR WITH EVOLVE
EVOLVE IS NOT BEING DEFINED WITH YES OR NO, BUT NO STOPS EVERYTHING, SINCE EVOLVE IS UNDEFINED, IT GETS STUCK ON THE QUESTION
but why does it only get stuck on 'no'?

FLYING -> ROCK -> 'NO' and it gets stuck? State is being set but it is not progressing?

*/
