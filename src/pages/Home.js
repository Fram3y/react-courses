import { LoginForm } from "../components/LoginForm";

export function Home({authenticated, onAuthenticated})
{
    return(
        <>
        <div className="ui container">
            <h2>Home</h2>
            {(!authenticated) ? (<LoginForm authenticated={authenticated} onAuthenticated={onAuthenticated}/>) : ("Welcome to College Portal")}
        </div>
        </>
        
    )
}