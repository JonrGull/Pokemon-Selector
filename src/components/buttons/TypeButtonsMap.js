import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export default function TypeButtonsMap({ uniqueWeaknessArray, onClick }) {
  const mapButtons = uniqueWeaknessArray.sort().map((type) => (
    <Box display="flex" justifyContent="space-between" flexDirection="row">
      <Button key={type} variant="contained" onClick={() => onClick(type)}>
        {type}
      </Button>
    </Box>
  ));
  return <div>{mapButtons}</div>;
}

/* 
If I want to change the buttons to have Japanese text, could I do something with the replace method?

Sorting then mapping allows the buttons to always be alphabetical
*/
