import { useState } from "react";

function Content({ parts }) {
  let exercises = parts.reduce((acc, currVal) => {
    return acc + currVal.exercises;
  }, 0);
  console.log(exercises);
  return parts.map((part) => {
    return (
      <>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      </>
    );
  });
}

export default Content;
