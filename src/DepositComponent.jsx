import { useState } from "react";

const DepositComponent = ({ onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState(0);

  const handleDeposit = () => {
    const depositNumber = parseInt(depositAmount);

    if (!isNaN(depositNumber) && depositNumber > 0) {
      // (moneyToAdd) => setTotalMoney(totalMoney + moneyToAdd)
      onDeposit(depositNumber);
      setDepositAmount(0);
    } else {
      console.log(
        "Invalid deposit amount. Please enter a valid number greater than 0."
      );
    }
  };

  return (
    <div>
      <label>
        Deposit amount:
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </label>
      <button onClick={handleDeposit}>Add balance</button>
    </div>
  );
};

export default DepositComponent;
