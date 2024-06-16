import { useContext } from "react"
import { AuthContext } from "./security/AuthContext"

export default function FooterComponent() {
    const authContext = useContext(AuthContext)
    return (
        <footer className="footer">
            <div className="container">
                Footer 
            </div>
        </footer>
    )
}
