import { useEffect, useState } from "react";
import data from "./data";
import Dice from "./components/Dice";

function App() {
  const [dices, setDices] = useState(data);
  const [resetGame, setResetGame] = useState(false);

  const handleRoll = () => {
    setDices((oldDices) => {
      return oldDices.map((dice) => {
        if (!dice.selected) {
          let num = Math.floor(Math.random() * 10 + 1);
          return { ...dice, value: num };
        } else {
          return dice;
        }
      });
    });
  };

  const handleReset = () => {
    setDices(data);
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
      <div className="container">
        <h2 className="title">Tenzies</h2>
        <p className="text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <ul className="dices">{dicesToShow}</ul>
        {!resetGame ? (
          <button className="button" onClick={handleRoll}>
            Roll
          </button>
        ) : (
          <button className="button" onClick={handleReset}>
            Reset Game
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
