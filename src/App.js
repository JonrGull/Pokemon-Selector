import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = React.useState(null);

  React.useEffect(() => {
    setPokemonData(PokemonLibrary.pokemon);
  }, []);

  function filterPokemon(library) { // filter first 50 pokemon
    let result = [];
    for (let value of library) {
      let newValue = parseInt(value.num);
      if (newValue <= 50) {
        result.push(newValue);
      }
    }
    return result;
  }

  console.log(filterPokemon(PokemonLibrary.pokemon));

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <div>
        <button onClick={filterPokemon}> Filter me </button>
      </div>
      {pokemonData &&
        pokemonData.map((poke) => (
          <p key={poke.id}>
            #{poke.num} | {poke.name} | {poke.type[0]} {poke.type[1]}
            <img src={poke.img} alt="Pokemon Images"></img>
          </p>
        ))}
    </div>
  );
}
