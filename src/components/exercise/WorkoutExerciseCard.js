import React from "react"
import "./WorkoutExercise.css"
import { Link } from "react-router-dom"

export const WorkoutExerciseCard = ({workoutExercise}) => {
    return (
    <section className="exercise">
        <h3 className="exercise__name">         
        <Link to={`/workoutExercises/detail/${workoutExercise.id}`}>
          { workoutExercise.name }
        </Link>
        </h3>
    </section>
)}

