/* import React from "react"
import "./Workout.css"
import { Link } from "react-router-dom"

export const WorkoutCard = ({workout}) => {
    return (
    <section className="location">
        <h3 className="location__name">         
        <Link to={`/workouts/detail/${workout.id}`}>
          { workout.name }
        </Link>
        </h3>
        <div className="workout__timestamp"> {workout.timestamp} </div>
    </section>
)} */


 import React from "react"
import "./Workout.css"
import { Link } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"

export const WorkoutCard = ({workout}) => {
    return (
    <section className="workout">
        <div className="date"> {workout.timestamp} </div>
        <h3 className="workout__name">         
        <Link to={`/workouts/detail/${workout.id}`}>
          { workout.name }
        </Link>
        </h3>
    </section>
)}
 