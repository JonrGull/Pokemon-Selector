import React from "react";

import { Button } from "@mui/material";

export default function ResetBtn({
  setPokemonData,
  PokemonLibrary,
  setPokemonAttributes,
}) {
  //Reset ALL data in states
  function resetAll() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setPokemonAttributes(() => ({
      // we don't need to spread here because we don't need to copy anything. We are just overwriting the state.
      type: null,
      weakness: null,
      evolve: null,
      height: null,
      weight: null,
    }));
  }
  //would need to include all other states that we declared
  return (
    <Button variant="contained" color="error" onClick={resetAll}>
      Reset
    </Button>
  );
}
