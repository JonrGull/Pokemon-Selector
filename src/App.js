import React, { useState, useCallback } from "react";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

import DisplayPokemon from "./components/UI/DisplayPokemon";
import PokemonLibrary from "./data/PokemonList.json";
import HeightBtn from "./components/UI/buttons/HeightBtn";
import WeightBtn from "./components/UI/buttons/WeightBtn";
import TypeButtonsMap from "./components/UI/buttons/TypeButtonsMap";
import EvolveBtn from "./components/UI/buttons/EvolveBtn";
import "./App.css";
import GetPokemonCries from "./components/API/GetPokemonCries";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  const [PokemonAttributes, setPokemonAttributes] = useState({ type: "" });
  // const [type, setType] = useState(null);
  const [weakness, setWeakness] = useState(null);
  const [evolve, setEvolve] = useState(null); // so null is inherently FALSE, so technically this will always be false. Which is why true works.
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  //#region Questions
  /* QUESTION FUNCTIONS */

  // assigns type of pokemon
    const typeAssign = useCallback(
    (typeInput) => {
      setType(typeInput);
      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter((pokemon) => pokemon.type.includes(`${typeInput}`))
      );
    },
    [setType, setPokemonData]
  );

  const typeAssign = useCallback(
    (e, key) => {
      const { value } = e.target;
      console.log(e);
      setPokemonAttributes((prev) => ({ ...prev, [key]: value }));
    },
    [setPokemonAttributes, setPokemonData]
  );
  // PokemonAttributes.type = "Fire";
  console.log(PokemonAttributes);

  // assigns weakness of pokemon
  const weaknessAssign = useCallback(
    (typeWeaknessInput) => {
      setWeakness(typeWeaknessInput);
      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter((pokemon) =>
          pokemon.weaknesses.includes(`${typeWeaknessInput}`)
        )
      );
    },
    [setWeakness, setPokemonData]
  );

  // assigns true or false upon asking if pokemon can evolve
  const evolveAssign = useCallback(
    (canEvolve) => {
      setEvolve(canEvolve); // is it okay if this is a boolean with using !evolve?
      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter((pokemon) => {
          if (canEvolve)
            return pokemon.prev_evolution || pokemon.next_evolution;
          else return !pokemon.prev_evolution && !pokemon.next_evolution;
        })
      );
    },
    [setEvolve, setPokemonData]
  );
  // assigns height of pokemon
  const heightAssign = useCallback(
    (minHeight, maxHeight) => {
      setHeight(maxHeight);
      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter(
          (pokemon) =>
            pokemon.height >= `${minHeight}` && pokemon.height <= `${maxHeight}`
        )
      );
    },
    [setHeight, setPokemonData]
  );

  // assigns weight of pokemon
  const weightAssign = useCallback(
    (minWeight, maxWeight) => {
      setWeight(maxWeight);
      setPokemonData((prevPokeArray) =>
        prevPokeArray.filter(
          (pokemon) =>
            pokemon.weight >= `${minWeight}` && pokemon.weight <= `${maxWeight}`
        )
      );
    },
    [setWeight, setPokemonData]
  );
  //#endregion

  //Reset ALL data in states
  const reset = () => {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setPokemonAttributes.type = "";
    setWeakness(null);
    setEvolve(null);
    setHeight(null);
    setWeight(null);
  };
  //would need to include all other states that we declared

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
            {PokemonAttributes.type === null && (
              <div style={{ fontSize: 50 }}>
                <strong> Select Type</strong>
                <TypeButtonsMap
                  uniqueWeaknessArray={uniqueWeaknessArray}
                  onClick={typeAssign}
                />
              </div>
            )}

            {/* Pokemon weakness? */}
            {PokemonAttributes.type !== null && weakness === null && (
              <div style={{ fontSize: 50 }}>
                <strong>Select Weakness</strong>
                <TypeButtonsMap
                  uniqueWeaknessArray={uniqueWeaknessArray}
                  onClick={weaknessAssign}
                />
              </div>
            )}

            {/* Can or can't evolve? */}
            {PokemonAttributes.type !== null &&
              weakness !== null &&
              evolve === null && (
                <div style={{ fontSize: 50 }}>
                  <strong>Does your Pokemon evolve?</strong>
                  <EvolveBtn
                    mapEvolutions={mapEvolutions}
                    onClick={evolveAssign}
                  />
                </div>
              )}

            {/* What height? */}
            {PokemonAttributes.type !== null &&
              weakness !== null &&
              evolve !== null &&
              height === null && (
                <div style={{ fontSize: 50 }}>
                  <strong>Select Height</strong>
                  <HeightBtn mapHeight={mapHeight} onClick={heightAssign} />
                </div>
              )}

            {/* What weight? */}
            {PokemonAttributes.type !== null &&
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
            {PokemonAttributes.type !== null &&
              weakness !== null &&
              evolve !== null &&
              height !== null &&
              weight !== null && (
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
