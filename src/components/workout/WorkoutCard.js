import React from "react"
import "./Workout.css"
import { Link } from "react-router-dom"

export const WorkoutCard = ({workout}) => {
    return (
    <section className="workout">
        <div className="date"> { new Date(workout.timestamp).toLocaleDateString('en-US')  } </div>
        <h3 className="workout__name">         
        <Link to={`/workouts/detail/${workout.id}`}>
          { workout.name }
        </Link>
        </h3>
    </section>
)}
 