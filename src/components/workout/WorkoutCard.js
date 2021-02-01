import React from "react"
import "./Workout.css"
import { Link } from "react-router-dom"

export const WorkoutCard = ({workout}) => {
    return (
    <section className="workout">
        <h3 className="workout__name">         
        <Link to={`/workouts/detail/${workout.id}`}>
          { workout.name }
        </Link>
        </h3>
        <div className="workout__type"> {workout.type} </div>
    </section>
)}
