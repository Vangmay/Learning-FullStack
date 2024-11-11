import { useState } from "react";
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div> the app is used by pressing the buttons </div>;
  }
  return <div> button press history: {props.allClicks.join(" ")} </div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
    setTotal(left + right + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
    setTotal(left + right + 1);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(" ")}</p>
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  );
};

export default App;
