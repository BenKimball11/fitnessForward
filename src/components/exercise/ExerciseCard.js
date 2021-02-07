import React from "react"
import "./Exercise.css"
import { Link } from "react-router-dom"

export const ExerciseCard = ({exercise, workout}) => {
    return (
    <section className="exercises">
        <h3 className="exercise__name">         
        <Link to={`/exercises/detail/${exercise.id}`}>
          { exercise.name }
        </Link>
        </h3>
        <div className="exercise__workout">{exercise.name}</div>
        <button className='edit'> <Link to={`/exercises/edit/${exercise.workoutId}`}>Edit</Link> </button>
    </section>
)}