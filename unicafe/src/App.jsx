/* eslint-disable react/prop-types */
import { useState } from "react";

function Statistics({ feedback }) {
  return feedback.total > 0 ? (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticsLine text="good" value={feedback.good} />
        <StatisticsLine text="bad" value={feedback.bad} />
        <StatisticsLine text="neutral" value={feedback.neutral} />
        <StatisticsLine text="average" value={feedback.average} />
        <StatisticsLine text="all" value={feedback.all} />
        <StatisticsLine text="positive" value={feedback.positive} />
      </table>
    </>
  ) : (
    <h2>No feedback given</h2>
  );
}

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

function StatisticsLine({ text, value }) {
  return (
    <p>
      {text} : {value}
    </p>
  );
}

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    score: 0,
    total: 0,
    positive: 0,
  });

  const handleClickGood = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
      score: feedback.score + 1,
      total: feedback.total + 1,
      positive: (feedback.good / feedback.total) * 100,
    });
  };

  const handleClickNeutral = () => {
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
      score: feedback.score + 0,
      total: feedback.total + 1,
      positive: (feedback.good / feedback.total) * 100,
    });
  };

  const handleClickBad = () => {
    setFeedback({
      ...feedback,
      bad: feedback.bad + 1,
      score: feedback.score - 1,
      total: feedback.total + 1,
      positive: (feedback.good / feedback.total) * 100,
    });
  };

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickBad} text="bad" />
      <Button onClick={handleClickNeutral} text="neutral" />

      <Statistics feedback={feedback} />
      <div>{anecdotes[selected]}</div>
      <p>Votes : {points[selected]}</p>
      <button
        onClick={() => {
          let copy = [...points];
          copy[selected] += 1;
          console.log(copy);
          setPoints(copy);
          console.log(points);
        }}
      >
        Vote
      </button>
      <button
        onClick={() => {
          let newSelected = Math.floor(Math.random() * 7);
          setSelected(newSelected);
          console.log(newSelected);
        }}
      >
        Next anecdote
      </button>
    </>
  );
}

export default App;
