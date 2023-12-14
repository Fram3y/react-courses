import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

export function Navbar({ authenticated, onAuthenticated }) {
  const navigate = useNavigate();

  const logout = () => {
    onAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="ui secondary pointing menu">
        <p className="item active">
          <Link to="/">Home</Link>
        </p>

        <Dropdown text="Courses" className="item">
          <Dropdown.Menu>
            <Link to="/courses"><Dropdown.Item>View Courses</Dropdown.Item></Link>
            <Link to="/courses/create"><Dropdown.Item>Create Course</Dropdown.Item></Link>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown text="Lecturers" className="item">
          <Dropdown.Menu>
          <Link to="/lecturers"><Dropdown.Item>View Lecturers</Dropdown.Item></Link>
          <Link to="/lecturers/create"><Dropdown.Item>Add Lecturer</Dropdown.Item></Link>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown text="Enrolments" className="item">
          <Dropdown.Menu>
          <Link to="/enrolments"><Dropdown.Item>View Enrolments</Dropdown.Item></Link>
          <Link to="/enrolments/create"><Dropdown.Item>Add Enrolement</Dropdown.Item></Link>
          </Dropdown.Menu>
        </Dropdown>

        <div className="right menu">
          {authenticated ? (
            <Link className="ui item" onClick={logout}>
              Logout
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
