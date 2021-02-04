import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/workouts">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/workouts/create">Add a Workout</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/exercises">Add an Exercise</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/exercises"></Link>
            </li>
 
        </ul>
    )
}