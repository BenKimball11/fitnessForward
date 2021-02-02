import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Fitness Forward</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/workouts">Workouts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/workoutExercises">Exercises</Link>
            </li>
 
        </ul>
    )
}