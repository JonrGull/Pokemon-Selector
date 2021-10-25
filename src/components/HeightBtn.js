import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function HeightBtn({ onClick }) {
  return (
    <div>
      <Button variant="contained" onClick={() => onClick(0, 1)}>
        ~1m
      </Button>
      <Button variant="contained" onClick={() => onClick(1, 3)}>
        1m ~ 3m
      </Button>
      <Button variant="contained" onClick={() => onClick(3, 10)}>
        3m ~ 10m
      </Button>
    </div>
  );
}
