const Total = (props) => {
  return (
    <p>
      Total number of exercises:{" "}
      {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};

export default Total;