import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { helloWorldPath, retriveHelloWorldApi } from "../api/HWApiService"

export default function WelcomeComponent() {
    const {username} = useParams()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi() {
        console.log('called')
        retriveHelloWorldApi()
        // axios.get('http://localhost:8080/hello-world')
            .then ( (response) => console.log(response))
            .catch((error) => console.log(error))
            .finally(() => console.log('cleanup'))

        // helloWorldPath('duc')
        //     .then ( (response) => console.log(response))
        //     .catch((error) => console.log(error))
        //     .finally(() => console.log('cleanup'))
    }

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to='/todos'>Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

