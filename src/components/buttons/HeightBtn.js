import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function HeightBtn({ mapHeight, onClick }) {
  // console.log(mapHeight);
  //pokemon less than 1m
  const lessThanOne =
    Math.min(...mapHeight) <= 1 ? (
      <Button variant="contained" onClick={() => onClick(0, 1)}>
        Small
      </Button>
    ) : null;

  //pokemon between 1m and 3m
  const betweenOneAndThree = mapHeight.some((v) => v >= 1 && v <= 3) ? (
    <Button variant="contained" onClick={() => onClick(1, 3)}>
      Medium
    </Button>
  ) : null;

  //pokemon over 3m
  const overThree =
    Math.max(...mapHeight) >= 3 ? (
      <Button variant="contained" onClick={() => onClick(3, 10)}>
        Big
      </Button>
    ) : null;

  return (
    <Stack
      justifyContent="center"
      gap={2}
      flexDirection="row"
      width={1.0}
      flexWrap="wrap"
    >
      {lessThanOne}
      {betweenOneAndThree}
      {overThree}
    </Stack>
  );
}
