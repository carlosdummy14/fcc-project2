import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import Confetti from "react-confetti";
// import data from "./data";

function App() {
  const [dices, setDices] = useState(randomDices());
  const [resetGame, setResetGame] = useState(false);

  function randomDices() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        id: i,
        value: Math.floor(Math.random() * 6 + 1),
        selected: false,
      });
    }
    return newArray;
  }

  const handleRoll = () => {
    setDices((oldDices) => {
      return oldDices.map((dice) => {
        if (!dice.selected) {
          let num = Math.floor(Math.random() * 6 + 1);
          return { ...dice, value: num };
        } else {
          return dice;
        }
      });
    });
  };

  const handleReset = () => {
    setDices(randomDices());
    setResetGame(false);
  };

  const selectDice = (id) => {
    setDices((oldDices) => {
      return oldDices.map((dice) => {
        if (dice.id === id) {
          return { ...dice, selected: !dice.selected };
        } else {
          return dice;
        }
      });
    });
  };

  useEffect(() => {
    const dicesSelected = dices.filter((dice) => dice.selected);
    if (dicesSelected.length === 10) {
      setResetGame(
        dicesSelected.every((dice) => dice.value === dicesSelected[0].value)
      );
    }
  }, [dices]);

  const dicesToShow = dices.map((dice) => {
    return <Dice key={dice.id} dice={{ ...dice }} selectDice={selectDice} />;
  });

  return (
    <main className="main">
      {resetGame && <Confetti />}
      <div className="container">
        <h2 className="title">Tenzies</h2>
        <p className="text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <ul className="dices">{dicesToShow}</ul>
        <button
          className="button"
          onClick={resetGame ? handleReset : handleRoll}
        >
          {resetGame ? "Play Again" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
