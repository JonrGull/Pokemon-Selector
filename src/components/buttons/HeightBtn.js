import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function HeightBtn({ mapHeight, onClick }) {
  console.log(mapHeight);
  //pokemon less than 1m
  const lessThanOne =
    Math.min(...mapHeight) < 1 ? (
      <Button variant="contained" onClick={() => onClick(0, 1)}>
        ~ 1m
      </Button>
    ) : null;

  //pokemon between 1m and 3m
  const betweenOneAndThree = mapHeight.some((v) => v > 1 && v < 3) ? (
    <Button variant="contained" onClick={() => onClick(1, 3)}>
      1m ~ 3m
    </Button>
  ) : null;

  //pokemon over 3m
  const overThree =
    Math.max(...mapHeight) > 3 ? (
      <Button variant="contained" onClick={() => onClick(3, 10)}>
        3m +
      </Button>
    ) : null;

  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {lessThanOne}
        {betweenOneAndThree}
        {overThree}
      </Stack>
    </div>
  );
}
