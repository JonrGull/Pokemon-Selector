import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonLibrary from "./data/PokemonList.json";

export default function App() {
  const [pokemonData, setPokemonData] = useState(PokemonLibrary.pokemon); //The giant array of pokemon with pokemon nested in individual obj
  // const [languageState, SetLanguageState] = useState();

  /* React.useEffect(() => { //still works without this, so let's remove it for now.
    setPokemonData(PokemonLibrary.pokemon);
  }, []); */

  /* 
Put all these functions in useEffect?
*/

  /*   const { typeArray = pokemonData.map((getType) => getType.type) } =
    pokemonData;
  // console.log(typeArray);

  // .map((ele) => ele) } = pokemonData;
  const filterTypeOne = (typeButtonInput) => {
    // can i use array destructuring here?
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter(() => {
        return typeArray.includes(`${typeButtonInput}`);
      })
    );
  }; */

  const filterTypeOne = (typeButtonInput) => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.type.includes(`${typeButtonInput}`);
      })
    );
  };

  const filterWeakness = (weaknessButtonInput) => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.weaknesses.includes(`${weaknessButtonInput}`);
      })
    );
  };

  /* 
  Weight may be tricky because it is written as a string - kg. Maybe I can just remove the kg part from the json to make it easier. 
  Then just turn it into a number. Is there a function that can take off the kg? 
  */
  const filterWeight = (weightButtonInput) => {
    setPokemonData((prevPokeArray) =>
      prevPokeArray.filter((pokeType) => {
        return pokeType.weight.includes(`${weightButtonInput}`);
      })
    );
  };

  //Reset State
  function reset() {
    setPokemonData((prevPokeArray) => (prevPokeArray = PokemonLibrary.pokemon));
  }

  //Error message and my terrible button. This should probably be it's own state?
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
      <div className="ButtonGroup">
        {/* prettier-ignore */}
        <span>
        {/* We could TRY to use the pictures from the card game...but that would require pictures, not emojis */}
        {/* Also I'd like to remove buttons if no Pokemon are left*/}
        {/* Is it possible to have a function make buttons for us? They all have a different parameter, unsure if possible */}
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Bug")}>Bug 🐛</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Dragon")}>Dragon 🐲</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Electric")}>Electric ⚡</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Fighting")}>Fighting 🥊</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Fire")}>Fire 🔥</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Flying")}>Flying 🕊️</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Ghost")}>Ghost 👻</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Grass")}>Grass 🍃</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Ground")}>Ground 🕳️</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Ice")}>Ice 🧊</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Normal")}>Normal ⭐</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Poison")}>Poison ☠️</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Psychic")}>Psychic 🔮</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Rock")}>Rock 🧱</button>
        <button className = "filterTypeBtns" onClick={() => filterTypeOne("Water")}>Water 💧</button>
        </span>
      </div>
      <div>
        <button onClick={filterWeakness}>Weak to Ice</button>

        <button onClick={() => filterWeight("6.9 kg")}>
          Weight equal to 6.9kg
        </button>

        <button className="resetBtn" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="displayPokemon">
        {pokemonData.map((pokeObj) => (
          <p key={pokeObj.id}>
            # #{pokeObj.num} | {pokeObj.name} | {pokeObj.type[0]}{" "}
            {pokeObj.type[1]}
            <img src={pokeObj.img} alt="Pokemon Images"></img>
          </p>
        ))}
      </div>
    </div>
  );
}

// if color 5 exists, print 'color 5 exists. if not, color 5 does not exist
// if pokeObj.type[1] exists, print the type. If not, null

// `${result['color 5'] ? 'color 5 exists!' : 'color 5 does not exist!'`
//removed pokemonData && before on line51. Idk what that did.

/*
I'll keep this for now but I think it's worthless. This is using array destructuring but it only works for Bulbasaur
I think I would have to loop it for it to work, but it would have to look at each object, destructure to get
the array of types, then pass that in to includes. So I think it would basically be doing what .filter is already
doing.

OR USE MAP TWICE?

const {typeArray = pokemonData[0].type.map(ele => ele  ) } = pokemonData;
console.log(typeArray);

const filterTypeOne = (typeButtonInput) => {
  // can i use array destructuring here?
  setPokemonData((prevPokeArray) =>
    prevPokeArray.filter(() => {
      return typeArray.includes(`${typeButtonInput}`);
    })
  );
}; */
