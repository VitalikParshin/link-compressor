import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const { NavLink, useNavigate } = require("react-router-dom")

export const Navbar = () => {
    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    const onLogout = (event) => {
        event.preventDefault();
        auth.logout()
        navigate("/")
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: " 0 2rem" }}>
                <a href="/" className="brand-logo">Compress links</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={onLogout}>Logout</a></li>
                </ul>
            </div>
        </nav >
    )

}