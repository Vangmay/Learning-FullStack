import Part from "./Part";
const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => {
        return (
          <Part key={part.key} part={part.name} exercises={part.exercises} />
        );
      })}
    </>
  );
};

export default Content;
