import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = React.useState(null);

  React.useEffect(() => {
    setPokemonData(PokemonLibrary.pokemon);
  }, []);

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      {pokemonData &&
        pokemonData.map((poke) => <p key={poke.id}>{poke.name}</p>)}
    </div>
  );
}
