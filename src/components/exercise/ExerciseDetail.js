import React, { useContext, useEffect, useState, useProps } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams, Link } from "react-router-dom";
import { ExerciseContext } from "./ExerciseProvider.js";
import "./Exercise.css";

export const ExerciseDetail = ({exercise, exerciseDelete, refreshWorkout}) => {
    const { getExerciseById, } = useContext(ExerciseContext);

    const user = localStorage.getItem("fitnessforward_user")

  
    //const {exercise} = useParams();
   
    const history = useHistory();

   /*  const removeExercise = () => {
      removeExercise(exercise.id)
     .then(() => history.push(`/workouts`));
  }; */

  useEffect(() => {
    //debugger

    getExerciseById(exercise.id)
    //.then((response) => setExercise(response));
    }, 
    []);

  return (
    <section className="exerciseCard">
      <h3 className="exercise__name">{exercise.name}</h3>
       {/*  * What's up with the question mark???? See below. */}
      <div className="exercise__workout__weightUsed">Weight Used: {exercise.weightUsed}</div>

      <div className="exercise__workout__restInterval">Rest Interval: {exercise.restInterval}</div>


      <button className="deleteBtn"
                    onClick={() => exerciseDelete(exercise.id)}>
                    Delete exercise 
          </button>

      {/* <button onClick={removeExercise}>Remove Exercise</button> */}
      <button onClick={() => {
          history.push(`/exercises/detail/${exercise.id}`)
      }}>Edit</button>
    </section>
  );
}; 