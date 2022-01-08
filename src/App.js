import React, { useState, useCallback } from "react";

import Stack from "@mui/material/Stack";

import DisplayPokemon from "./components/UI/DisplayPokemon";
import PokemonLibrary from "./data/PokemonList.json";
import HeightBtn from "./components/UI/buttons/HeightBtn";
import WeightBtn from "./components/UI/buttons/WeightBtn";
import TypeButtonsMap from "./components/UI/buttons/TypeButtonsMap";
import EvolveBtn from "./components/UI/buttons/EvolveBtn";
import "./App.css";
import GetPokemonCries from "./components/API/GetPokemonCries";
import ResetBtn from "./components/UI/buttons/ResetBtn";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  const [pokemonAttributes, setPokemonAttributes] = useState({
    type: null,
    weakness: null,
    evolve: null,
    height: null,
    weight: null,
  });

  //#region Questions
  /* QUESTION FUNCTIONS */

  console.log(pokemonAttributes);
  // assigns type of pokemon
  const typeAssign = useCallback(
    (typeInput) => {
      setPokemonAttributes((prevState) => ({
        // copy the values in the entire object and spread them, change "type", "weakness" etc.
        ...prevState,
        type: `${typeInput}`,
      }));

      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter((pokemon) => pokemon.type.includes(`${typeInput}`))
      );
    },
    [setPokemonAttributes, setPokemonData]
  );

  // assigns weakness of pokemon
  const weaknessAssign = useCallback(
    (typeWeaknessInput) => {
      setPokemonAttributes((prevState) => ({
        ...prevState,
        weakness: `${typeWeaknessInput}`,
      }));

      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter((pokemon) =>
          pokemon.weaknesses.includes(`${typeWeaknessInput}`)
        )
      );
    },
    [setPokemonAttributes, setPokemonData]
  );

  // assigns boolean upon asking if pokemon can evolve
  const evolveAssign = useCallback(
    (canEvolve) => {
      setPokemonAttributes((prevState) => ({
        ...prevState,
        evolve: canEvolve,
      }));

      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter((pokemon) => {
          if (canEvolve)
            return pokemon.prev_evolution || pokemon.next_evolution;
          else return !pokemon.prev_evolution && !pokemon.next_evolution;
        })
      );
    },
    [setPokemonAttributes, setPokemonData]
  );

  // assigns height of pokemon
  const heightAssign = useCallback(
    (minHeight, maxHeight) => {
      setPokemonAttributes((prevState) => ({
        ...prevState,
        height: maxHeight,
      }));

      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter(
          (pokemon) =>
            pokemon.height >= `${minHeight}` && pokemon.height <= `${maxHeight}`
        )
      );
    },
    [setPokemonAttributes, setPokemonData]
  );

  // assigns weight of pokemon
  const weightAssign = useCallback(
    (minWeight, maxWeight) => {
      setPokemonAttributes((prevState) => ({
        ...prevState,
        weight: maxWeight,
      }));

      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter(
          (pokemon) =>
            pokemon.weight >= `${minWeight}` && pokemon.weight <= `${maxWeight}`
        )
      );
    },
    [setPokemonAttributes, setPokemonData]
  );

  //#endregion

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

  //If user clicks on card to select pokemon, return the pokemon in array so that it can be mapped.
  const selectPoke = (poke) => {
    setPokemonData([poke]);
  };

  //#endregion Child Component

  //Logs pokemon array each render
  // console.log(pokemonData);
  return (
    <div className="App">
      <h1>Pokémon Selector!</h1>
      <ResetBtn
        setPokemonData={setPokemonData}
        PokemonLibrary={PokemonLibrary}
        setPokemonAttributes={setPokemonAttributes}
      ></ResetBtn>
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
                {/* map last pokemon. This does not interfere with the component from below.*/}
                {pokemonData.map((pokeObj) => (
                  <DisplayPokemon key={pokeObj.id} pokeObj={pokeObj} />
                ))}
                {/* plays sound of last remaining pokemon */}
                {GetPokemonCries(pokemonData.map((pokeObj) => pokeObj.id))}
              </Stack>
            </h2>
          </div>
        )}
      </div>

      <div>
        {/* bandaid solution of preventing both of these from rendering.*/}
        {pokemonData.length !== 1 && (
          <div>
            {/* Pokemon type? */}
            {pokemonAttributes.type === null && (
              <div style={{ fontSize: 50 }}>
                <strong> Select Type</strong>
                <TypeButtonsMap
                  uniqueWeaknessArray={uniqueWeaknessArray}
                  onClick={typeAssign}
                />
              </div>
            )}

            {/* Pokemon weakness? */}
            {pokemonAttributes.type !== null &&
              pokemonAttributes.weakness === null && (
                <div style={{ fontSize: 50 }}>
                  <strong>Select Weakness</strong>
                  <TypeButtonsMap
                    uniqueWeaknessArray={uniqueWeaknessArray}
                    onClick={weaknessAssign}
                  />
                </div>
              )}

            {/* Can or can't evolve? */}
            {pokemonAttributes.type !== null &&
              pokemonAttributes.weakness !== null &&
              pokemonAttributes.evolve === null && (
                <div style={{ fontSize: 50 }}>
                  <strong>Does your Pokemon evolve?</strong>
                  <EvolveBtn
                    mapEvolutions={mapEvolutions}
                    onClick={evolveAssign}
                  />
                </div>
              )}

            {/* What height? */}
            {pokemonAttributes.type !== null &&
              pokemonAttributes.weakness !== null &&
              pokemonAttributes.evolve !== null &&
              pokemonAttributes.height === null && (
                <div style={{ fontSize: 50 }}>
                  <strong>Select Height</strong>
                  <HeightBtn mapHeight={mapHeight} onClick={heightAssign} />
                </div>
              )}

            {/* What weight? */}
            {pokemonAttributes.type !== null &&
              pokemonAttributes.weakness !== null &&
              pokemonAttributes.evolve !== null &&
              pokemonAttributes.height !== null &&
              pokemonAttributes.weight === null && (
                <div style={{ fontSize: 50 }}>
                  <strong>Select Weight</strong>
                  <WeightBtn mapWeight={mapWeight} onClick={weightAssign} />
                </div>
              )}

            {/* Result */}
            {pokemonAttributes.type !== null &&
              pokemonAttributes.weakness !== null &&
              pokemonAttributes.evolve !== null &&
              pokemonAttributes.height !== null &&
              pokemonAttributes.weight !== null && (
                <div style={{ fontSize: 55 }}>
                  <strong>Here are your Pokemon!</strong>
                </div>
              )}
            <h1>See one you like? Choose it!</h1>
            <div className="display-pokemon">
              {pokemonData.map((pokeObj) => (
                <DisplayPokemon
                  key={pokeObj.id}
                  pokeObj={pokeObj}
                  selectPoke={selectPoke}
                  pokemonData={pokemonData}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 
PROBLEM - if only one pokemon is left after going through questions, it does not play the sound. But clicking it works
 
DOES NOT WORK {GetPokemonCries(pokemonData.map((pokeObj) => pokeObj.id))} plays 2 times if clicked, but sound does play upon final choice twice.
Is it because state is being updated? Maybe would be better to useEffect?


*/
