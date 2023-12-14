import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Create() {
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [form, setForm] = useState({
    date: "",
    time: "",
    status: "",
    course_id: "",
    lecturer_id: ""
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    status: "",
    course_id: "",
    lecturer_id: ""
  });

  const errorStyle = {
    color: "red"
  };

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLecturers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const courseList = courses.map((course) => {
    return (
      <option key={course.id} value={course.id}>
        {course.title}
      </option>
    );
  });

  const lecturerList = lecturers.map((lecturer) => {
    return (
      <option key={lecturer.id} value={lecturer.id}>
        {lecturer.name}
      </option>
    );
  });

  const isRequired = (fields) => {
    let included = true;
    setErrors({});

    fields.forEach((field) => {
      if (!form[field]) {
        included = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`,
          },
        }));
      }
    });

    return included;
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    console.log(form)
    e.preventDefault();

    if (isRequired(["date", "time", "status", "course_id", "lecturer_id"])) {
      axios
        .post(`https://college-api.vercel.app/api/enrolments`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Navigate(`/enrolments`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="ui container">
        <h3>Create Enrolment</h3>
        <form className="ui form" onSubmit={submitForm}>
          {/* COURSE */}
          <div>Course:</div>
          <select onChange={handleForm} name="course_id">
            {courseList}
          </select>
          <span style={errorStyle}>{errors.course_id?.message}</span>
          <br />

          {/* LECTURER */}
          <div>Lecturer:</div>
          <select
            onChange={handleForm}
            name="lecturer_id">
            {lecturerList}
          </select>
          <span style={errorStyle}>{errors.lecturer_id?.message}</span>
          <br />

          {/* STATUS */}
          <div>
            Status:
            <input
              type="text"
              onChange={handleForm}
              name="status" />
            <span style={errorStyle}>{errors.status?.message}</span>
          </div>
          <br />

          {/* DATE */}
          <div>
            Date:
            <input
              type="date"
              onChange={handleForm}
              name="date"
            />
            <span style={errorStyle}>{errors.date?.message}</span>
          </div>
          <br />

          {/* TIME */}
          <div>
            Time:
            <input
              type="time"
              onChange={handleForm}
              name="time"
            />
            <span style={errorStyle}>{errors.time?.message}</span>
          </div>
          <br />

          <input className="ui primary button" type="submit" />
        </form>
      </div>
    </>
  );
}
