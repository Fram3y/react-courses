import { useEffect, useState } from "react";
import axios from "axios";
import { EnrolmentCard } from "../../components/EnrolmentCard";

export function Index({authenticated}) {
  const [enrolments, setEnrolments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/enrolments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEnrolments(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const enrolmentList = enrolments.map((enrolment) => {
    return (
      <>
        <div key={enrolment.id}>
        {authenticated ? (
          <EnrolmentCard
            id={enrolment.id}
            title={enrolment.course.title}
            lecturer={enrolment.lecturer.name}
            status={enrolment.status}
          />
        ) : (
          <EnrolmentCard
            id={enrolment.id}
            title={enrolment.course.title}
            lecturer={enrolment.lecturer.name}
            status={enrolment.status}
          />
        )}
        </div>
      </>
    );
  });

  return (
    <>
      <div className="ui container">{enrolmentList}</div>
    </>
  );
}
