import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export function Edit() {
    const Navigate = useNavigate();
    const [lecturer, setLecturer] = useState(null);
    const {id} = useParams();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
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
        console.log('Submitted', form);

        if (isRequired(['name', 'address', 'phone', 'email'])) {
            let token = localStorage.getItem('token');

            axios
                .put(`https://college-api.vercel.app/api/lecturers/${id}`, form, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => {
                    setLecturer(response.data.data);
                    setForm(response.data.data);
                    Navigate(`/lecturers`);
                })
                .catch(error => {
                    console.error(error);
                });
        };
    };

    return (
        <>
            <div className="ui container">
                <h3>Edit Lecturer</h3>
                <form className="ui form" onSubmit={submitForm}>
                    {/* NAME */}
                    <div>
                        Name: <input type="text" onChange={handleForm} value={form.name} name="name" /> <span style={errorStyle}>{errors.name?.message}</span>
                    </div>
                    <br />

                    {/* ADDRESS */}
                    <div>
                        Address: <input type="text" onChange={handleForm} value={form.address} name="address" /> <span style={errorStyle}>{errors.address?.message}</span>
                    </div>
                    <br />

                    {/* PHONE */}
                    <div>
                        Phone: <input type="text" onChange={handleForm} value={form.phone} name="phone" /> <span style={errorStyle}>{errors.phone?.message}</span>
                    </div>
                    <br />

                    {/* EMAIL */}
                    <div>
                        Email: <input type="text" onChange={handleForm} value={form.email} name="email" /> <span style={errorStyle}>{errors.email?.message}</span>
                    </div>
                    <br />

                    <input className="ui primary button" type='submit' />
                </form>
            </div>
        </>
    )
}