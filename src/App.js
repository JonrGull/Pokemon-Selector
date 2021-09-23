import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = React.useState(PokemonLibrary.pokemon);
  // const [pokemonData, setPokemonData] = PokemonLibrary.pokemon;

  const toDisplay = PokemonLibrary.pokemon;

  React.useEffect(() => {
    setPokemonData(PokemonLibrary.pokemon);
  }, []);

  const filterPokemon = (e) => {
    const myFilteredPoke = toDisplay.filter((f) => {
      if (f.type[1] === "Ice") {
        //maybe use .includes to check both index spots ["grass","poison"] vs ["poison","grass"]
        //if dealing with an array here you need the index
        return true;
      } else {
        return false;
      }
    });
    setPokemonData(myFilteredPoke); //always need this. This re-renders to update state.
  };

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <div>
        <button onClick={filterPokemon}>Filter me</button>
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
