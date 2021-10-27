import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

//this is an object with an array inside
export default function TypeButtonsMap({ uniqueWeaknessArray, onClick }) {
  const mapButtons = uniqueWeaknessArray.map(
    (type) =>
      <p>key = {type}</p> && (
        <Button variant="contained" onClick={() => onClick(type)}>
          {type}
        </Button>
      )
  );
  return (
    <div>
      <Stack spacing={1} direction="row">
        {mapButtons}
      </Stack>
    </div>
  );
}

//   const flattenArray = Object.values(uniqueWeaknessArray).flat(1);
//   const typeObject = flattenArray.reduce((a, v) => ({ ...a, [v]: v }), {}); // object of types that are now sorted alphabetically because of reduce
//   console.log(typeObject); //array of object types?
