import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = React.useState(PokemonLibrary.pokemon); //exact  same value as myFilteredPoke. Just the starting value

  const pokeListCopy = PokemonLibrary.pokemon; //toDisplay

  React.useEffect(() => {
    setPokemonData(PokemonLibrary.pokemon);
  }, []);

  //const globalArray = giant array of pokemon objects
  // have functions that mutate globalArray and returns the array to global memory
  // so other functions call pass this mutated array and spit out the mutated array a 2nd time

  //how do we make a global array, that can be modified and saved

  /*   let arr = PokemonLibrary.pokemon.filter(function (e) {
    console.log(e.type.indexOf(type) >= 0);
  }); 
  */

  const filterTypeOne = () => {
    const myFilteredPoke = pokeListCopy.filter((pokeType) => {
      return pokeType.type.includes("Grass");
    });
    console.log(myFilteredPoke); // shows array of objects of left over pokemon

    setPokemonData(myFilteredPoke); //always need this. This re-renders to update state.
  };

  // we need to have one global array to pass to all the functions
  const filterWeakness = () => {
    const myFilteredPoke = pokeListCopy.filter((pokeType) => {
      return pokeType.weaknesses.includes("Ice");
    });
    console.log(myFilteredPoke); // shows array of objects of left over pokemon

    setPokemonData(myFilteredPoke);
  };

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <div>
        <button onClick={filterTypeOne}>Filter Grass</button>
        <button onClick={filterWeakness}>Weak to Ice</button>
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

/* 
This function doesn't return anything. It just modifies the array

function removeEven(arr, invert = false) {
    for (let i = 0; i < arr.length; ++i) {
        const even = arr[i] !== "Fire"
        if (even ^ invert) {
            arr.splice(i--, 1)
        }
    }
}

const arr = ["Fire", "Fire", "Water", "Grass", "Fire", "Poison", "Flying"]
removeEven(arr)
console.log(arr)
*/
