import React from "react"
import "./Exercise.css"
import { Link } from "react-router-dom"

export const ExerciseCard = ({exercise, workout}) => {
    return (
    <section className="exercise">
        <h3 className="exercise__name">         
        <Link to={`/exercises/detail/${exercise.id}`}>
          { exercise.name }
        </Link>
        </h3>
        <div className="exercise__workout">{exercise.name}</div>
    </section>
)}


/* import React from "react"
import "./Exercise.css"

export const ExerciseCard = ({exercise, workout}) => (
    <section className="exercise">
        <h3 className="exercise__name">{exercise.name}</h3>
        <div className="exercise__workout">{workout.name}</div>
        <address className="exercise__address">{workout.address}</address>
    </section>
)
 */