import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register()
{
    const [register, setRegister] = useState({
        name:"",
        email: "",
        password: ""
      });

      const [errorMessage, setErrorMessage] = useState("");
      const Navigate = useNavigate();

      const errorStyle = {
        color: "red",
      };

      const handleClick = () => {
        axios
          .post(`https://college-api.vercel.app/api/register`, {
            name: register.name,
            email: register.email,
            password: register.password
          })
          .then((response) => {
            Navigate('/')
          })
          .catch((error) => {
            console.error(error);
    
            setErrorMessage(error.response.data.message);
          });
      };

      const handleForm = (e) => {
        setRegister((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

      return(
        <>
            <div className="ui container">
                <div className="ui form">
                    {/* Name Input */}
                    <div className="field">
                        <label>Name</label>
                        <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={register.name}
                        onChange={handleForm}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="field">
                        <label>Email</label>
                        <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={register.email}
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
                        value={register.password}
                        onChange={handleForm}
                        />
                    </div>

                    {/* Register Button */}
                    <button className="ui button" onClick={handleClick}>
                    Register
                    </button>
                    <p style={errorStyle}>{errorMessage}</p>

                    <div>
                        Have an account already? <Link to="/">Log in Here!</Link>
                    </div>

                </div>
            </div>
        </>
      );
}