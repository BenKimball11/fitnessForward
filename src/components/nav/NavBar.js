import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import "../auth/Login";
import { Logout } from "../auth/Logout";

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/workouts">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/workouts">Workouts</Link>
            </li>
            
            <li className="navbar__item">
                <div><a href="https://www.youtube.com/playlist?list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4" target="_blank">Exercise Demenstrations</a></div>
            </li> 
            <li className="navbar__item">
                <button className="logOut" onClick={Logout()}>Logout</button>
            </li>
 
        </ul>
    )
}