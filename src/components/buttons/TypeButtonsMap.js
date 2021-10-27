import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function TypeButtonsMap({ uniqueWeaknessArray, onClick }) {
  const mapButtons = uniqueWeaknessArray.sort().map((type) => (
    <Button key={type} variant="contained" onClick={() => onClick(type)}>
      {type}
    </Button>
  ));
  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {mapButtons}
      </Stack>
    </div>
  );
}

/* 
Sort then map allows the buttons to always be alphabetical
*/
