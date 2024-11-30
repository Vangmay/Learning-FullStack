import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = (e) => {
    e.preventDefault();
    setGood(good + 1);
    setTotal(total + 1);
    setScore(score + 1);
    setAverageScore((score + 1) / (total + 1));
    setPositive((good + 1) / (total + 1));
  };

  const handleNeutral = (e) => {
    e.preventDefault();
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setAverageScore(averageScore / (total + 1));
    setPositive(positive / (total + 1));
  };

  const handleBad = (e) => {
    e.preventDefault();
    setBad(bad + 1);
    setTotal(total + 1);
    setScore(score - 1);
    setAverageScore((score - 1) / (total + 1));
    setPositive(good / (total + 1));
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      {total > 0 ? (
        <>
          <h1>Statistics</h1>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>all {total}</p>
          <p>bad {bad}</p>
          <p>average {averageScore}</p>
          <p>positive {positive}</p>
        </>
      ) : (
        <p>No feedback Given</p>
      )}
    </>
  );
};

export default App;
