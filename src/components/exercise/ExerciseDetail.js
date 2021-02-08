import React, { useContext, useEffect, useState, useProps } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams, Link } from "react-router-dom";
import { ExerciseContext } from "./ExerciseProvider.js";
import "./Exercise.css";

export const ExerciseDetail = ({ exercise , exerciseDelete }) => {
 
    //const { updateExercise} = useContext
    const user = localStorage.getItem("fitnessforward_user")
   
  
    //const {exerciseId} = useParams();
   
    const history = useHistory();
 
  /*    const removeExercise = () => {
      removeExercise(exercise.id)
     .then(() => history.push(`/workouts`));
  };  */
    
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
  );
  }