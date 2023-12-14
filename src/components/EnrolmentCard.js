import { Card } from "semantic-ui-react";

export function EnrolmentCard(props) {
  return (
    <>
      <Card fluid href={`/enrolments/${props.id}`}>
        <Card.Content header={props.title} />
        <Card.Content className="meta">
          <div className="meta">Lecturer : {props.lecturer}</div>
          <br />
          <div className="meta">Status : {props.status}</div>
        </Card.Content>
      </Card>
      <br />
    </>
  );
}
