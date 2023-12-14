import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteButton } from "../../components/DeleteButton";
import axios from "axios";
import { Button } from "semantic-ui-react";

export function Show() {
  const { id } = useParams();
  const [enrolment, setEnrolment] = useState(null);
  const Navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEnrolment(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  if (!enrolment) {
    return <h3>Enrolement Not Found</h3>;
  }

  return (
    <>
      <div className="ui container">
        <div className="ui header">
            Enrolement ID : {enrolment.id}
        </div>
        <br />
        <div>
            <b>Course:</b> {enrolment.course.title}
        </div>
        <br />
        <div>
            <b>Lecturer:</b> {enrolment.lecturer.name}
        </div>
        <br />
        <Button color="violet" href={`/enrolments/${id}/edit`}>
          Edit enrolment
        </Button>
        <DeleteButton
          id={enrolment.id}
          resource="enrolments"
          deleteCallback={() => Navigate("/enrolments")}
        />
      </div>
    </>
  );
}
