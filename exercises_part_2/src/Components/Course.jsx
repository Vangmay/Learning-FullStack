import Content from "./Content";
import TotalCount from "./TotalCount";

function Course({ course }) {
  return (
    <>
      <header>{course.name}</header>
      <Content parts={course.parts} />
      <TotalCount parts={course.parts} />
    </>
  );
}

export default Course;
