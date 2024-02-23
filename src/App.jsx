import { useState } from "react";
import DepositComponent from "./DepositComponent";
import Machine from "./Machine";

export default function App() {
  const [totalMoney, setTotalMoney] = useState(1000);
  const betAmount = 50;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ marginRight: "20px" }}>{totalMoney}</h1>
        <DepositComponent
          onDeposit={(moneyToAdd) => setTotalMoney(totalMoney + moneyToAdd)}
        />
      </div>
      <Machine
        onSpin={(winAmout) => setTotalMoney(totalMoney - betAmount + winAmout)}
      />
    </>
  );
}
