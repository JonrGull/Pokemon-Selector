export default function TypeButtons({ handleClick }) {
  //so here we would need to pass in different functions if we want to reuse these buttons
  return (
    <div>
      {/* prettier-ignore */}
      <span>
        {/* We could TRY to use the pictures from the card game...but that would require pictures, not emojis */}
        {/* Also I'd like to remove buttons if no Pokemon are left*/}
        {/* Is it possible to have a function make buttons for us? They all have a different parameter, unsure if possible */}
        <button className = "filterTypeBtns" onClick={() => handleClick("Bug")}>Bug 🐛</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Dragon")}>Dragon 🐲</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Electric")}>Electric ⚡</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Fighting")}>Fighting 🥊</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Fire")}>Fire 🔥</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Flying")}>Flying 🕊️</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Ghost")}>Ghost 👻</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Grass")}>Grass 🍃</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Ground")}>Ground 🕳️</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Ice")}>Ice 🧊</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Normal")}>Normal ⭐</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Poison")}>Poison ☠️</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Psychic")}>Psychic 🔮</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Rock")}>Rock 🧱</button>
        <button className = "filterTypeBtns" onClick={() => handleClick("Water")}>Water 💧</button>
        </span>
    </div>
  );
}


/* 
what if we make a component that houses ALL the questions and it is importing all of the typeButtons (for at least 2 of those questions)
*/