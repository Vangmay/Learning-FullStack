const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises:{" "}
      {parts.reduce((total, x) => {
        console.log(total);
        return total + parseInt(x.exercises);
      }, 0)}
    </p>
  );
};

export default Total;
