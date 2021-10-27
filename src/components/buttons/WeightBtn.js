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
  const betweenFiveAndTwentyFive =
    Math.min(...mapWeight) > 5 && Math.max(...mapWeight) < 25 ? (
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
water - eletric less than 1m only 25KG???? HOW DO I GET SQUIRTLE?? he is 0.51m and 9kg

GASTLY? HAUNTER? they are 0.1kg but only 25KG is showing up?? [0.1, 0.1, 40.5] gengar is fat



Logging mapWeight will not log until this component is rendered in the questions! 
*/
