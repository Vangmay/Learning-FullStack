import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} : {value}
    </p>
  );
};

const Statistics = ({ good, bad, neutral, positive, average, total }) => {
  return (
    <>
      <h1>Statistics</h1>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="total" value={total} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [total, setTotal] = useState(0);

  const calculateStats = (good, neutral, bad) => {
    const sum = good * 1 + neutral * 0 + bad * -1;
    const total = good + neutral + bad;
    const average = sum / total;
    setAverage(average);
    setPositive((good / total) * 100);
    setTotal(total);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button
        onClick={() => {
          setGood(good + 1);
          calculateStats(good + 1, neutral, bad);
        }}
      >
        Good
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
          calculateStats(good, neutral + 1, bad);
        }}
      >
        Neutral
      </button>
      <button
        onClick={() => {
          setBad(bad + 1);
          calculateStats(good, neutral, bad + 1);
        }}
      >
        Bad
      </button>

      {total > 0 ? (
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          average={average}
          positive={positive}
          total={total}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
