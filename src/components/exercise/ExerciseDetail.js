//import React, { useContext } from "react";
//import { ExerciseContext } from "./ExerciseProvider"
// useParams grabs parameters of the url to use in the component
import { useHistory } from "react-router-dom";
import "./Exercise.css";
//The expression can be a React variable, or property, or any other valid JavaScript expression. 
//JSX will execute the expression and return the result:
export const ExerciseDetail = ( { exercise , exerciseDelete } ) => {
 //const { exercise , exerciseDelete } =useContext(ExerciseContext)
    //const user = localStorage.getItem("fitnessforward_user") 
    const history = useHistory();

    
  return (
    <section className="exerciseCard">
    <h3 className="exercise__name">{exercise.name}</h3>  
      <div className="weightUsed">Weight Used: {exercise.weightUsed}</div>

      <div className="restInterval">Rest Interval: {exercise.restInterval}</div>


      <button className="deleteBtn"
          onClick={() => exerciseDelete(exercise.id)}>
          Remove exercise 
      </button>
          <button className='edit' onClick={() => {
          history.push(`/exercises/edit/${exercise.id}`)
        }}>Edit</button>

    </section>
  )
  }