import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //exact  same value as myFilteredPoke. Just the starting value

  // const pokeListCopy = PokemonLibrary.pokemon; //toDisplay
  //do i need a prevArray or something? Like the count example? State is modified with the button. Right now, they are both using the same array!

  /* React.useEffect(() => { //still works without this, so let's remove it for now.
    setPokemonData(PokemonLibrary.pokemon);
  }, []); */

  const filterTypeOne = () => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes("Grass");
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

  const filterFire = () => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes("Flying");
      })
    );
  };
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
  }

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <div className="filterButtons">
        <button onClick={filterTypeOne}>Filter Grass</button>
        <button onClick={filterWeakness}>Weak to Ice</button>
        <button onClick={filterBug}>Bug Type</button>
        <button onClick={filterFire}>Flying Type</button>

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
