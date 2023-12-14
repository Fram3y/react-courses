import { useEffect, useState } from "react";
import axios from "axios";

import { CourseCard } from "../../components/CourseCard";
import { Grid } from "semantic-ui-react";

export function Index({ authenticated }) {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]);

  if (courses.length === 0) return <h3>There are no courses</h3>;

  const courseList = courses.map((course) => {
    return (
      <div key={course.id}>
        {authenticated ? (
          <CourseCard
            id={course.id}
            title={course.title}
            description={course.description}
            enrolments={course.enrolments}
          />
        ) : (
          <CourseCard
            id={course.id}
            title={course.title}
            description={course.description}
            enrolments={course.enrolments}
          />
        )}
      </div>
    );
  });

  return (
    <>
      <div className="ui container">
        <h2>All Courses</h2>
        <br />
        <div className="ui divided three column grid">
          {courseList}
        </div>
      </div>
    </>
  );
}
