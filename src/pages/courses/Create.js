import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Create() {
    const Navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
    });

    const errorStyle = {
        color: 'red'
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const isRequired = (fields) => {
        let included = true;
        setErrors({});

        fields.forEach(field => {
            if (!form[field]) {
                included = false;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required`
                    }
                }));
            };
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (isRequired(['title', 'code', 'description', 'points', 'level'])) {
            let token = localStorage.getItem('token');

            axios
                .post(`https://college-api.vercel.app/api/courses`, form, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => {
                    Navigate(`/courses`);
                })
                .catch(error => {
                    console.error(error);
                });
        };
    };

    return (
        <>
            <div className="ui container">
                <h3>Create Course</h3>
                <form className="ui form" onSubmit={submitForm}>
                    {/* TITLE */}
                    <div>
                        Title: <input type="text" onChange={handleForm} value={form.title} name="title" /> <span style={errorStyle}>{errors.title?.message}</span>
                    </div>
                    <br />

                    {/* CODE */}
                    <div>
                        Code: <input type="text" onChange={handleForm} value={form.code} name="code" /> <span style={errorStyle}>{errors.code?.message}</span>
                    </div>
                    <br />

                    {/* DESCRIPTION */}
                    <div>
                        Description: <input type="text" onChange={handleForm} value={form.description} name="description" /> <span style={errorStyle}>{errors.description?.message}</span>
                    </div>
                    <br />

                    {/* POINTS */}
                    <div>
                        Points: <input type="text" onChange={handleForm} value={form.points} name="points" /> <span style={errorStyle}>{errors.points?.message}</span>
                    </div>
                    <br />

                    {/* LEVEL */}
                    <div>
                        Level: <input type="text" onChange={handleForm} value={form.level} name="level" /> <span style={errorStyle}>{errors.level?.message}</span>
                    </div>
                    <br />

                    <input className="ui primary button" type='submit' />
                </form>
            </div>
        </>
    )
}