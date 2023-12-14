import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginForm({ authenticated, onAuthenticated }) 
{
  const [login, setLogin] = useState({
    email: "Sammy@sam.sam",
    password: "secret123",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    axios
      .post(`https://college-api.vercel.app/api/login`, {
        email: login.email,
        password: login.password,
      })
      .then((response) => {
        onAuthenticated(true, response.data.token);
      })
      .catch((error) => {
        console.error(error);

        setErrorMessage(error.response.data.message);
      });
  };

  const handleForm = (e) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorStyle = {
    color: "red",
  };

  return (
    <>
      <div className="ui form">
        {/* Email Input */}
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={handleForm}
          />
        </div>

        {/* Password Input */}
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={handleForm}
          />
        </div>

        <button className="ui button" onClick={handleClick}>
          Log In
        </button>
        <p style={errorStyle}>{errorMessage}</p>
      </div>

      <div>
        Don't have an account yet? <Link to="/register">Register Here!</Link>
      </div>
    </>
  );
}
