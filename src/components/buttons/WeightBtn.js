import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function WeightBtn({ mapWeight, onClick }) {
  console.log(mapWeight);
  //pokemon less than 5kg
  const lessThanFive =
    Math.min(...mapWeight) <= 5 ? ( //is the max number less than 5? if true, show the button
      <Button variant="contained" onClick={() => onClick(0, 5)}>
       Light
      </Button>
    ) : null;

  //pokemon between 5kg and 25kg
  const betweenFiveAndTwentyFive = mapWeight.some((v) => v > 5 && v < 25) ? ( // as long as 1 number is between 5 and 25, show this button
    <Button variant="contained" onClick={() => onClick(5, 25)}>
      Medium
    </Button>
  ) : null;

  const overTwentyFive =
    Math.max(...mapWeight) > 25 ? (
      <Button variant="contained" onClick={() => onClick(25, 500)}>
        Heavy
      </Button>
    ) : null;

  // can I further reduce this? Can I go to the function and do math.max/min over there and bring those two values here go show buttons?
  // I could make this range checker its  own function and just pass values?
  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {lessThanFive}
        {betweenFiveAndTwentyFive}
        {overTwentyFive}
      </Stack>
    </div>
  );
}

/* 
cant get flareon, 25.0 kg what about a pokemon who is like 25.2kg? I can't start the count at 26.



Logging mapWeight will not log until this component is rendered in the questions! 

Make the range checker into func?
function between(x, min, max) {
  return x >= min && x <= max;
}
// ...
if (between(x, 0.001, 0.009)) {
  // something
}
*/
