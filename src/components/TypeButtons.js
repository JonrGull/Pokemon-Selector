export default function TypeButtons({filterTypeOne}) { //so here we would need to pass in different functions if we want to reuse these buttons
  return (
    <div>
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
  );
}
