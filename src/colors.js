import { cards } from "./Machine";

export const getSymbol = (number) => {
  let color = "black";
  if (number == 0) {
    color = "green";
  } else if (number == 1) {
    color = "blue";
  } else if (number == 2) {
    color = "orange";
  } else if (number == 3) {
    color = "red";
  }
  return { symbol: cards[number], color: color };
};
