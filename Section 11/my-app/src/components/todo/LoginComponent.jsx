import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {

    const [username, setUsername] = useState('in28minutes')

    const [password, setPassword] = useState('')

    const [messageType, setMessageType] = useState(null);

    const navigate = useNavigate()

    const authContext = useAuth()

    // Function to show a success message
    const showSuccessMessage = () => {
        setMessageType(true);
    };

    // Function to show an error message
    const showErrorMessage = () => {
         setMessageType(false);
    };

    // Function to hide the message
    const hideMessage = () => {
        setMessageType(null);
    };

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)){
            setMessageType(true);
            navigate(`/welcome/${username}`)
        } else {
            setMessageType(false)
        }
    }

    return (
        <div className="Login">
            <h1>Time to Login</h1>
            {messageType === true && (
                <div>
                    {/* Render success message */}
                    <p>Success!</p>
                    <div className="successMessage">Authenticated Successfully</div>
                </div>
            )}
            {messageType === false && (
                <div>
                    {/* Render error message */}
                    <div className="errorMessage">Authentication Failed. Please check your credentials.</div>
                </div>
            )}
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}