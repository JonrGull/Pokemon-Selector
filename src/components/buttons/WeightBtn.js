import { Button } from "@mui/material";

export default function WeightBtn({ mapWeight, onClick }) {
  console.log(mapWeight);
  //pokemon less than 5kg
  const lessThanFive =
    Math.min(...mapWeight) < 5 ? ( //is the max number less than 5? if true, show the button
      <Button variant="contained" onClick={() => onClick(0, 5)}>
        ~ 5kg
      </Button>
    ) : null;

  //pokemon between 5kg and 25kg
  const betweenFiveAndTwentyFive = mapWeight.some((v) => v > 5 && v < 25) ? ( // as long as 1 number is between 5 and 25, show this button
    <Button variant="contained" onClick={() => onClick(5, 25)}>
      5kg ~ 25kg
    </Button>
  ) : null;

  const overTwentyFive =
    Math.max(...mapWeight) > 25 ? (
      <Button variant="contained" onClick={() => onClick(25, 500)}>
        25kg +
      </Button>
    ) : null;

  // can I further reduce this? Can I go to the function and do math.max/min over there and bring those two values here go show buttons?
  // I could make this range checker its  own function and just pass values?
  return (
    <div>
      {lessThanFive}
      {betweenFiveAndTwentyFive}
      {overTwentyFive}
    </div>
  );
}

/* 
I THINK HEIGHT AND WEIGHT ARE SUPER BROKEN */

/* 
water - electric - 1 - 3m to test. the ~5 should be gone
water - eletric less than 1m only 25KG???? HOW DO I GET SQUIRTLE?? he is 0.51m and 9kg something is wrong with the 2nd option the middle button should be appear

GASTLY? HAUNTER? they are 0.1kg but only 25KG is showing up?? [0.1, 0.1, 40.5] gengar is fat maybe its okay now? wtf?



Logging mapWeight will not log until this component is rendered in the questions! 

Make the range checker into func?
function between(x, min, max) {
  return x >= min && x <= max;
}
// ...
if (between(x, 0.001, 0.009)) {
  // something
}



  const betweenFiveAndTwentyFive =
    Math.min(...mapWeight) > 5 && Math.max(...mapWeight) < 25 ? ( // this is wrong.  this is looking at 4, the first value in the array and turning false. and the max weight is not less than 25 so double false
      <Button variant="contained" onClick={() => onClick(5, 25)}>
        5kg ~ 25kg
      </Button>
    ) : null;
*/
