function TotalCount({ parts }) {
  return (
    <p>
      Total Exercises: {parts.reduce((acc, curr) => acc + curr.exercises, 0)}
    </p>
  );
}

export default TotalCount;
