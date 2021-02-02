import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { WorkoutExerciseContext } from "./WorkoutExerciseProvider.js";
import "./WorkoutExercise.css";

export const WorkoutExerciseDetail = () => {
    const { getWorkoutExerciseById, removeWorkoutExercise } = useContext(WorkoutExerciseContext);

    // This is one location so it is an object, not an array
    const [workoutExercise, setWorkoutExercise] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {workoutExerciseId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeWorkoutExercise(workoutExercise.id)
      .then(() => history.push("/workoutExercises"));
  };

  useEffect(() => {
    getWorkoutExerciseById(workoutExerciseId)
    .then((response) => setWorkoutExercise(response));
    }, // eslint-disable-next-line
    []);

  return (
    <section className="exercise">
      <h3 className="exercise__name">{workoutExercise.name}</h3>
      <button onClick={handleRemoving}>Remove Exercise</button>
      <button onClick={() => {
          history.push(`/workoutExercises/edit/${workoutExercise.id}`)
      }}>Edit</button>
    </section>
  );
};