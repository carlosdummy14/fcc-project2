function Dice(props) {
  const {
    dice: { id, value, selected },
    selectDice,
  } = props;
  return (
    <li
      className={"dice" + ((selected && " selected") || "")}
      onClick={() => selectDice(id)}
    >
      {value}
    </li>
  );
}

export default Dice;
