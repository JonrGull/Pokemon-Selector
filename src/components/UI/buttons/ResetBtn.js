import React from "react";
import { Button } from "@mui/material";

export default function ResetBtn({}) {
  //Reset ALL data in states
  function resetAll() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
    setType(null);
    setWeakness(null);
    setEvolve(null);
    setHeight(null);
    setWeight(null);
    //would need to include all other states that we declared
  }
  return (
    <Button variant="contained" color="error" onClick={reset}>
      Reset
    </Button>
  );
}
