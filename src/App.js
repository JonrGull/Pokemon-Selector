import React, { useState } from "react";
import DisplayPokemon from "./components/UI/DisplayPokemon";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import PokemonLibrary from "./data/PokemonList.json";
import HeightBtn from "./components/UI/buttons/HeightBtn";
import WeightBtn from "./components/UI/buttons/WeightBtn";
import TypeButtonsMap from "./components/UI/buttons/TypeButtonsMap";
import EvolveBtn from "./components/UI/buttons/EvolveBtn";
import "./App.css";
import GetPokemonCries from "./components/API Call/GetPokemonCries";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  const [type, setType] = useState(null);
  const [weakness, setWeakness] = useState(null);
  const [evolve, setEvolve] = useState(null); // so null is inherently FALSE, so technically this will always be false. Which is why true works.
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

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

  //#region Child Component
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

  let lastPoke = pokemonData.map((pokeObj) => (
    <DisplayPokemon key={pokeObj.id} pokeObj={pokeObj} />
  ));

  //If user clicks on card to select pokemon, return the pokemon in array so that it can be mapped.
  const selectPoke = (poke) => {
    setPokemonData([poke]);
  };

  //#endregion Child Component

  //Logs pokemon array each render
  // console.log(pokemonData);

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <Button variant="contained" color="error" onClick={reset}>
        Reset
      </Button>
      {/* All states are set to null initially. Since null evaluates to false, we want to check specifically that they are not null. Due to the boolean in the evolve question.
      I could just check it for the evolve question, since it is the only boolean, but I want to keep do apply the same logic to the other questions 
      in case I add more in the future. */}

      <div>
        {pokemonData.length === 1 && (
          <div>
            <h1>Nice choice!</h1>
            <h2>
              <Stack
                justifyContent="center"
                gap={2}
                flexDirection="row"
                width={1.0}
                flexWrap="wrap"
              >
                {lastPoke}
                {/* {GetPokemonCries()} */}
              </Stack>
            </h2>
          </div>
        )}
      </div>

      <div>
        {/* bandaid solution of preventing both of these from rendering. Can I make it into an else? */}
        {pokemonData.length !== 1 && (
          <div>
            {/* Pokemon type? */}
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
                <strong>Does your Pokemon evolve?</strong>
                <EvolveBtn
                  mapEvolutions={mapEvolutions}
                  onClick={evolveAssign}
                />
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
            <h1>See one you like? Choose it!</h1>
            <div className="displayPokemon">
              {pokemonData.map((pokeObj) => (
                <DisplayPokemon
                  key={pokeObj.id}
                  pokeObj={pokeObj}
                  selectPoke={selectPoke}
                  pokemonData={pokemonData}
                />
              ))}
              {/*<h1>History</h1>
        {renderChoices()} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 
PROBLEM - if only one pokemon is left after going through questions, it does not play the sound. But clicking it works

*/

// const testArray = [
//   {
//     "id": 1,
//     "num": "001",
//     "name": "Bulbasaur",
// }]
// ;
// let newArray = testArray.shift()
// console.log(newArray.id);
