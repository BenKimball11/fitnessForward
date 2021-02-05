import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/workouts">Workouts</Link>
            </li>
            <li className="navbar__item">
                <div><a href="https://www.youtube.com/playlist?list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4" target="_blank">Exercise Demenstrations</a></div>
            </li> 
 
        </ul>
    )
}