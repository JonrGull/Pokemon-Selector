import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //exact  same value as myFilteredPoke. Just the starting value
  // const [languageState, SetLanguageState] = useState();

  // const pokeListCopy = PokemonLibrary.pokemon; //toDisplay

  /* React.useEffect(() => { //still works without this, so let's remove it for now.
    setPokemonData(PokemonLibrary.pokemon);
  }, []); */

  /* 
created prevArray which starts out as PokemonLibrary.pokemon. Each time a button is clicked, it sets the new state (setPokemonData) to
the new filtered array (prevPokeArray). Since we never hit two buttons at the same time, prevPokeArray remains consistent.
*/

  const filterTypeOne = (typeButtonInput) => {
    // can i use array destructuring here?
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes(`${typeButtonInput}`);
      })
    );
  };

  const filterWeakness = () => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.weaknesses.includes("Ice");
      })
    );
  };

  const filterBug = () => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes("Bug");
      })
    );
  };

  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
  }

  //Error message and my terrible button. This should probably be it's own state.
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
      <div className="filterTypeButtons">
        <button onClick={() => filterTypeOne("Bug")}>Bug</button>
        <button onClick={() => filterTypeOne("Dragon")}>Dragon</button>
        <button onClick={() => filterTypeOne("Electric")}>Electric</button>
        <button onClick={() => filterTypeOne("Fighting")}>Fighting</button>
        <button onClick={() => filterTypeOne("Fire")}>Fire 🔥</button>
        <button onClick={() => filterTypeOne("Flying")}>Flying</button>
        <button onClick={() => filterTypeOne("Ghost")}>Ghost</button>
        <button onClick={() => filterTypeOne("Grass")}>Grass</button>
        <button onClick={() => filterTypeOne("Ground")}>Ground</button>
        <button onClick={() => filterTypeOne("Ice")}>Ice</button>
        <button onClick={() => filterTypeOne("Normal")}>Normal</button>
        <button onClick={() => filterTypeOne("Poison")}>Poison</button>
        <button onClick={() => filterTypeOne("Psychic")}>Psychic</button>
        <button onClick={() => filterTypeOne("Rock")}>Rock</button>
        <button onClick={() => filterTypeOne("Water")}>Water</button>
      </div>
      <div>
        <button onClick={filterWeakness}>Weak to Ice</button>
        <button onClick={filterBug}>Bug Type</button>

        <button onClick={reset}>Reset</button>
      </div>
      <div className="displayPokemon">
        {pokemonData.map((pokeObj) => (
          <p key={pokeObj.id}>
            #{pokeObj.num} | {pokeObj.name} | {pokeObj.type[0]}{" "}
            {pokeObj.type[1]}
            <img src={pokeObj.img} alt="Pokemon Images"></img>
          </p>
        ))}
      </div>
    </div>
  );
}
//removed pokemonData && before on line51. Idk what that did.
