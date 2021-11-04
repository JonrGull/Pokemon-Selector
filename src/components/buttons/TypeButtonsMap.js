import { Button } from "@mui/material";
// import Stack from "@mui/material/Stack";

export default function TypeButtonsMap({ uniqueWeaknessArray, onClick }) {
  const mapButtons = uniqueWeaknessArray.sort().map((type) => (
    <Button key={type} variant="contained" onClick={() => onClick(type)}>
      {type}
    </Button>
  ));
  return <div>{mapButtons}</div>;
}

/* 
If I want to change the buttons to have Japanese text, could I do something with the replace method?

Sorting then mapping allows the buttons to always be alphabetical
*/
