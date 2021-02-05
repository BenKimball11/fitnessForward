import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { WorkoutContext } from "./WorkoutProvider.js";
import "./Workout.css";
import { ExerciseContext } from "../exercise/ExerciseProvider.js"

export const WorkoutDetail = () => {
    const { getWorkoutById, removeWorkout } = useContext(WorkoutContext);
    const { getExerciseById, removeExercise } = useContext(ExerciseContext)

    const [exercise, setExercise] =useState({})
    const [workout, setWorkout] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {workoutId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeWorkout(workout.id)
      .then(() => history.push("/workouts"));
  };

  useEffect(() => {
    getWorkoutById(workoutId)
    .then((response) => setWorkout(response));
    }, // eslint-disable-next-line
    []);

  return (
      
      <section className="workout">
        <button className="workout__removeButton" onClick={handleRemoving}> Remove workout</button>
        <button onClick={() => {
            history.push(`/workouts/edit/${workout.id}`)
        }}>Edit</button>
        <h3 className="workout__name">{workout.name}</h3>
        <div className="workout__date">Date: {workout.timestamp}</div>
        {/* What's up with the question mark???? See below.*/}
        <div className="workout__entry">Entry: {workout.logEntry}</div>
        <div className="workout__mood">Mood: {workout.workoutMood}</div>
        <div className="workout__exercises">
          <h4 className="workout__exercises__header">Exercises</h4>
          <div className="workout__exercises__names">
            {workout.exercises?.map(exercise => exercise.name).join(", ")}
          </div>
        <button onClick={() => {history.push("/exercises/create")}}>
                    Add Exercise
        </button> 
        <button onClick={handleRemoving}>Remove Exercise</button>
      <button onClick={() => {
          history.push(`/exercises/edit/${exercise.id}`)
      }}>Edit</button>
      </div>
      </section>
    )
};