import { Card, Icon, Grid, List, Button } from "semantic-ui-react";
import { DeleteButton } from "./DeleteButton";

export function LecturerCard(props) 
{
  return (
    <>
      <Card>
        {/* NAME */}
        <Card.Content header={props.name} />

        {/* INFORMATION */}
        <Card.Content>
          <List>
            <List.Item>{`Email: ${props.email}`}</List.Item>
            <List.Item>{`Phone: ${props.phone}`}</List.Item>
            <List.Item>{`Address: ${props.address}`}</List.Item>
          </List>
        </Card.Content>

        {/* ENROLMENTS */}
        <Card.Content>
          <Icon name="user" />
          {props.enrolments.length} Enrolments
        </Card.Content>

        {/* BUTTONS */}
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column>
              {/* EDIT BUTTON */}
              <Button color="violet" href={`/lecturers/${props.id}/edit`}>
                Edit Lecturer
              </Button>
            </Grid.Column>
            <Grid.Column>
              {/* DELETE BUTTON */}
              <DeleteButton
                id={props.id}
                resource="lecturers"
                deleteCallback={props.function}
              />
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
      <br />
    </>
  );
}
