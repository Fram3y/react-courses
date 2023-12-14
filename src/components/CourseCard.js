import { Card, Icon, Grid } from "semantic-ui-react";

export function CourseCard(props) {
  return (
    <>
      <Card href={`/courses/${props.id}`}>
        <Card.Content header={props.title} />
        <Card.Content description={props.description} />
        <Card.Content extra>
          <Grid columns={2}>
            <Grid.Column>
              <Icon name="user" />
              {props.enrolments.length} Enrolments
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
      <br />
    </>
  );
}
