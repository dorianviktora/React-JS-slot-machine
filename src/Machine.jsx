import React from "react";
import { useState, useEffect } from "react";
import { getSymbol } from "./colors";

const machineSize = 3; // 3 -> 3x3 machine, 5 -> 5x5 machine. Minimum size 2.

export const cards = ["A", "K", "Q", "7"];
const smallSymbols = ["K", "Q"];
const mediumSymbols = ["A"];
// const bigSymbols = ["7"];

export default function Machine({ onSpin }) {
  const [newSpinnedNumbers, setNewSpinnedNumbers] = useState(
    Array.from({ length: machineSize }, () =>
      Array.from({ length: machineSize }, () => getSymbol(cards.length - 1))
    )
  );
  const [spinWinAmount, setSpinWinAmount] = useState();

  const randomNumber = () => {
    return Math.floor(Math.random() * cards.length);
  };

  const checkPaylineWin = (line) => {
    if (!line.every((e) => e.symbol == line[0].symbol)) {
      return 0;
    }
    if (smallSymbols.includes(line[0].symbol)) {
      return 100;
    } else if (mediumSymbols.includes(line[0].symbol)) {
      return 200;
    } else {
      return 300;
    }
  };

  const payOffPaylines = (spinnedNumbers) => {
    let totalWin = 0;

    // row paylines
    for (let i = 0; i < machineSize; i++) {
      totalWin += checkPaylineWin(spinnedNumbers[i]);
    }

    // diagonal paylines
    const mainDiagonal = [];
    const antiDiagonal = [];

    for (let i = 0; i < machineSize; i++) {
      mainDiagonal.push(spinnedNumbers[i][i]);
      antiDiagonal.push(spinnedNumbers[machineSize - i - 1][i]);
    }
    totalWin += checkPaylineWin(mainDiagonal);
    totalWin += checkPaylineWin(antiDiagonal);

    return totalWin;
  };

  const spinMachine = () => {
    const spinnedNumbers = Array.from({ length: machineSize }, () =>
      Array.from({ length: machineSize }, () => getSymbol(randomNumber()))
    );
    setNewSpinnedNumbers(spinnedNumbers);

    const winAmout = payOffPaylines(spinnedNumbers);
    if (winAmout > 0) {
      setSpinWinAmount(winAmout);
    } else {
      setSpinWinAmount();
    }

    onSpin(winAmout);
  };

  useEffect(() => {
    //spinMachine();
  }, []);

  return (
    <>
      <div>
        Machine
        <button onClick={spinMachine}>SPIN</button>
        {newSpinnedNumbers.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((number, colIndex) => (
              <h1 key={colIndex} style={{ color: number.color }}>
                {number.symbol}
              </h1>
            ))}
          </div>
        ))}
      </div>
      <h2>{spinWinAmount}</h2>
    </>
  );
}
