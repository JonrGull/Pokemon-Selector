import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function WeightBtn({ onClick }) {
  return (
    <div>
      <Button variant="contained" onClick={() => onClick(0, 5)}>
        ~ 5kg
      </Button>
      <Button variant="contained" onClick={() => onClick(5, 25)}>
        5kg ~ 25gk
      </Button>
      <Button variant="contained" onClick={() => onClick(25, 500)}>
        25kg+
      </Button>
    </div>
  );
}
