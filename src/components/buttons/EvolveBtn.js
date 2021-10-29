import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function EvolveBtn({ mapEvolutions, onClick }) {
  //show both buttons if mapEvolutions has a mix of true and false.

  //pokemon that has a property prev_evolution or next_evolution
  const canEvolve = mapEvolutions.some((v) => v === true) ? (
    <Button variant="contained" onClick={() => onClick(true)}>
      Yes
    </Button>
  ) : null;

  //pokemon that do not have the property
  const cannotEvolve = mapEvolutions.some((v) => v === false) ? (
    <Button variant="contained" onClick={() => onClick(false)}>
      No
    </Button>
  ) : null;

  return (
    <div>
      {canEvolve}
      {cannotEvolve}
    </div>
  );
}
