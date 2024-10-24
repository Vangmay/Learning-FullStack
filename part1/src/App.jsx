import { useState } from "react";

const Header = (props) => {
  console.log(props);
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((part) => {
        return <Part key={part.exercises} part={part} />;
      })}
    </ul>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.totalParts[0].exercises +
        props.totalParts[1].exercises +
        props.totalParts[2].exercises}
    </p>
  );
};

const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
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
  const [counter, setCounter] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [total, setTotal] = useState(0);

  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const name = "Peter";
  const age = 10;
  console.log("rendering...", counter);

  const [allClicks, setAll] = useState([]);
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
    const updatedLeft = left + 1;
    setTotal(updatedLeft + right);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
    setTotal(left + right + 1);
  };

  return (
    <>
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total totalParts={course.parts} />
        <Hello name="Peter" age={age} />
      </div>
      <div>Left click : {left}</div>
      <div>Right click : {right}</div>

      <button onClick={handleLeftClick}>Left Click</button>
      <button onClick={handleRightClick}>Right click</button>
      <History allClicks={allClicks} />
    </>
  );
};

export default App;
