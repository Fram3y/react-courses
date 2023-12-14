import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { LecturerCard } from "../../components/LecturerCard";

export function Index({ authenticated }) {
  const [lecturers, setLecturers] = useState([]);
  const{ id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setLecturers(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token, id]);

  if (lecturers.length === 0) return <h3>There are no lecturers</h3>;

  const removeLecturer = (id) => {
    console.log("deleted" + id)

    let updatedLecturers = lecturers.filter((lecturer) => {
      return lecturer.id !== id;
    })

    setLecturers(updatedLecturers);
  }

  const lecturerList = lecturers.map((lecturer) => {
    return (
      <div key={lecturer.id}>
        {authenticated ? (
          <LecturerCard
            id={lecturer.id}
            name={lecturer.name}
            address={lecturer.address}
            email={lecturer.email}
            phone={lecturer.phone}
            enrolments={lecturer.enrolments}
            function={removeLecturer}
          />
        ) : (
          <LecturerCard
            id={lecturer.id}
            name={lecturer.name}
            address={lecturer.address}
            email={lecturer.email}
            phone={lecturer.phone}
            enrolments={lecturer.enrolments}
            function={removeLecturer}
          />
        )}
      </div>
    );
  });

  return (
    <>
      <div className="ui container">
        <h2>All Lecturers</h2>
        <br />
        <div className="ui divided three column grid">{lecturerList}</div>
      </div>
    </>
  );
}
