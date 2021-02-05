import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { ExerciseContext } from "./ExerciseProvider.js";
import "./Exercise.css";

export const ExerciseDetail = () => {
    const { getExerciseById, removeExercise } = useContext(ExerciseContext);

    // This is one location so it is an object, not an array
    const [exercise, setExercise, workout ] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {exerciseId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeExercise(exercise.id)
      .then(() => history.push("/exercises"));
  };

  useEffect(() => {
    getExerciseById(exerciseId)
    .then((response) => setExercise(response));
    }, 
    []);

  return (
    <section className="exercise">
      <h3 className="exercise__name">{exercise.name}</h3>
      <div className="exercise__workout__weightUsed">Workout: {exercise.workout?.name}</div>
        {/* What's up with the question mark???? See below.*/}
      <div className="exercise__workout__restInterval">Weight Used: {exercise.weightUsed}</div>
      <div className="exercise__workout__restInterval">Rest Interval: {exercise.restInterval}</div>
    </section>
  );
};