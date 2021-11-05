import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

export default function TypeButtonsMap({ uniqueWeaknessArray, onClick }) {
  const mapButtons = uniqueWeaknessArray.sort().map((type) => (
    <Button key={type} variant="contained" onClick={() => onClick(type)}>
      {type}
    </Button>
  ));
  return (
    <Stack
      justifyContent="center"
      gap={2}
      flexDirection="row"
      width={1.0}
      flexWrap="wrap"
    >
      {mapButtons}
    </Stack>
  );
}

/* 
Button is created in the function and then returned. I used to have it so the button was created in the return, but this just returned all buttons at once
without styling them properly.

If I want to change the buttons to have Japanese text, could I do something with the replace method?

Sorting then mapping allows the buttons to always be alphabetical
*/
