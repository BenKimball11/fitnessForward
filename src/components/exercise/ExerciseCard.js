import React from "react"
import "./Exercise.css"
import { Link } from "react-router-dom"

export const ExerciseCard = ({exercises, workout}) => {
    return (
    <section className="exercises">
        <h3 className="exercise__name">         
        <Link to={`/exercises/detail/${exercises.id}`}>
          { exercises.name }
        </Link>
        </h3>
        <div className="exercise__workout">{exercises.name}</div>
    </section>
)}