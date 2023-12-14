import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { Dropdown } from "semantic-ui-react";

export function Create({ authenticated }) {
  const Navigate = useNavigate();
  let token = localStorage.getItem("token");

//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`https://college-api.vercel.app/api/courses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setCourses(response.data.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [token]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

//   const [enrolments, setEnrolments] = useState({
//     date: "",
//     time: "",
//     status: "assigned",
//     course_id: "",
//     lecturer_id: "",
//   });

  const [errors, setErrors] = useState({
    // LECTURER ERRORS
    name: "",
    address: "",
    phone: "",
    email: "",
    // ENROLMENT ERRORS
    date: "",
    time: "",
    status: "",
    course_id: "",
    lecturer_id: "",
  });

  const errorStyle = {
    color: "red",
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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

  const submitForm = (e) => {
    e.preventDefault();

    if (
      isRequired([
        "name",
        "address",
        "phone",
        "email"
      ])
    ) {
      axios
        .post(`https://college-api.vercel.app/api/lecturers`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
            Navigate('lecturers');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="ui container">
        <h3>Add Lecturer</h3>
        <form className="ui form" onSubmit={submitForm}>
          {/* NAME */}
          <div>
            Name:{" "}
            <input
              type="text"
              onChange={handleForm}
              value={form.name}
              name="name"
            />{" "}
            <span style={errorStyle}>{errors.name?.message}</span>
          </div>
          <br />

          {/* ADDRESS */}
          <div>
            Address:{" "}
            <input
              type="text"
              onChange={handleForm}
              value={form.address}
              name="address"
            />{" "}
            <span style={errorStyle}>{errors.address?.message}</span>
          </div>
          <br />

          {/* PHONE */}
          <div>
            Phone:{" "}
            <input
              type="text"
              onChange={handleForm}
              value={form.phone}
              name="phone"
            />{" "}
            <span style={errorStyle}>{errors.phone?.message}</span>
          </div>
          <br />

          {/* EMAIL */}
          <div>
            Email:{" "}
            <input
              type="text"
              onChange={handleForm}
              value={form.email}
              name="email"
            />{" "}
            <span style={errorStyle}>{errors.email?.message}</span>
          </div>
          <br />

          <input className="ui primary button" type="submit" />
        </form>
      </div>
    </>
  );
}
