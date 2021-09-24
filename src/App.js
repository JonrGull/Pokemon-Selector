import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = React.useState(PokemonLibrary.pokemon); //exact  same value as myFilteredPoke. Just the starting value

  const libraryCopy = PokemonLibrary.pokemon; //toDisplay

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

  let myFilteredPoke = libraryCopy;

  const filterTypeOne = (e) => {
    myFilteredPoke = libraryCopy.filter((pokeType) => {
      //myFilteredPoke should be an ARRAY of OBJECTS

      return pokeType.type.includes("Water");
    });
    console.log(myFilteredPoke.splice); // shows array of objects of left over pokemon

    setPokemonData(myFilteredPoke); //always need this. This re-renders to update state.
  };

  // we need to have one global array to pass to all the functions
  const filterTypeTwo = (e) => {
    myFilteredPoke = libraryCopy.filter((pokeType) => {
      return pokeType.type.includes("Poison");
    });
    console.log(myFilteredPoke); // shows array of objects of left over pokemon

    setPokemonData(myFilteredPoke);
  };

  return (
    <div className="App">
      <h1>Pokemon Selector!</h1>
      <div>
        <button onClick={filterTypeOne}>Filter water</button>
        <button onClick={filterTypeTwo}>Filter poison</button>
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

const globalArray = [1,2,3,4,5,6,7,8,9,10]

<button> filter even            </button>
<button> filters numbers over 6 </button>

function filterEvens(){
  let results = []

  for(let nums of globalArray){
    if(nums % 2 === 0){
      result.push(nums)
    }
  }
  return results // this results should be a array of all evens
}




*/
