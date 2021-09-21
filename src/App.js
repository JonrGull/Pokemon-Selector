import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonList from "./data/PokemonList";

export default function App() {
  const [pokemonData, setPokemonData] = React.useState(null);

  React.useEffect(() => {
    setPokemonData(PokemonList.runways[0].name);
  }, []);
  return (
    <div>
      <h1>Pokemon Selector</h1>
    </div>
  );
}
