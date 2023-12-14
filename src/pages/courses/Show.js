import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { DeleteButton } from "../../components/DeleteButton";

export function Show()
{
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const Navigate = useNavigate();

    let token = localStorage.getItem('token')

    useEffect(() => {
        axios
        .get(`https://college-api.vercel.app/api/courses/${id}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => {
            setCourse(response.data.data)
        })
        .catch(error => {
            console.error(error)
        })
    },[id, token])

    if(!course){
        return <h3>Course Not Found</h3>
    }

    return (
        <>
            <div>
            <p><b>Title: </b>{course.title}</p>
            <p><b>Description: </b>{course.description}</p>
            <Button color="violet" href={`/courses/${id}/edit`}>Edit Course</Button>
            <DeleteButton id={course.id} resource="courses" deleteCallback={() => Navigate("/courses")} />
            </div>
        </>
    )
}