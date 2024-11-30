import { useState } from "react";

function indexOfMax(arr) {
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

const App = () => {
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

  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length - 1)
  );
  const [votes, setVotes] = useState(anecdotes.map((i) => 0));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Has {votes[selected]} votes</p>
      <br />
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        Next anecdote
      </button>
      <button
        onClick={() => {
          const oldVotes = [...votes];
          oldVotes[selected] = oldVotes[selected] + 1;
          setVotes(oldVotes);
        }}
      >
        Vote
      </button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[indexOfMax(votes)]}
    </div>
  );
};

export default App;
