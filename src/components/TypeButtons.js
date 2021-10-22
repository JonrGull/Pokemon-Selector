import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
export default function TypeButtons({ onClick }) {
  //so here we would need to pass in different functions if we want to reuse these buttons

  return (
    <div>
      {/* prettier-ignore */}
      <span>
        {/* We could TRY to use the pictures from the card game...but that would require pictures, not emojis */}
        {/* Also I'd like to remove buttons if no Pokemon are left*/}
        <Stack spacing={1} direction="row">{/* Is it possible to have a function make buttons for us? They all have a different parameter, unsure if possible */}
        <Button variant="contained" onClick={() => onClick("Bug")}>Bug 🐛</Button>
        <Button variant="contained" onClick={() => onClick("Dragon")}>Dragon 🐲</Button>
        <Button variant="contained" onClick={() => onClick("Electric")}>Electric ⚡</Button>
        <Button variant="contained" onClick={() => onClick("Fighting")}>Fighting 🥊</Button>
        <Button variant="contained" onClick={() => onClick("Fire")}>Fire 🔥</Button>
        <Button variant="contained" onClick={() => onClick("Flying")}>Flying 🕊️</Button>
        <Button variant="contained" onClick={() => onClick("Ghost")}>Ghost 👻</Button>
        <Button variant="contained" onClick={() => onClick("Grass")}>Grass 🍃</Button>
        <Button variant="contained" onClick={() => onClick("Ground")}>Ground 🕳️</Button>
        <Button variant="contained" onClick={() => onClick("Ice")}>Ice 🧊</Button>
        <Button variant="contained" onClick={() => onClick("Normal")}>Normal ⭐</Button>
        <Button variant="contained" onClick={() => onClick("Poison")}>Poison ☠️</Button>
        <Button variant="contained" onClick={() => onClick("Psychic")}>Psychic 🔮</Button>
        <Button variant="contained" onClick={() => onClick("Rock")}>Rock 🧱</Button>
        <Button variant="contained" onClick={() => onClick("Water")}>Water 💧</Button>
        </Stack>
        </span>
    </div>
  );
}
