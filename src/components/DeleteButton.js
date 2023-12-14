import axios from "axios";
import { useState } from "react";

export function DeleteButton({id, resource, deleteCallback})
{
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = () => {
        setIsLoading(true)
        let token = localStorage.getItem('token')

        axios.delete(`https://college-api.vercel.app/api/${resource}/${id}` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            deleteCallback(id)
        })
        .catch(error => {
            console.error(error)
        })
    }

    return(
        <button className="ui button colour red" onClick={onDelete}>
            {(isLoading) ? "Deleting..." : "Delete Item"}
        </button>
    )
}
