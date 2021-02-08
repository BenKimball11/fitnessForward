import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams, Link } from "react-router-dom";
import { WorkoutContext } from "./WorkoutProvider.js";
import "./Workout.css";
import { ExerciseContext } from "../exercise/ExerciseProvider.js"
import { ExerciseDetail } from "../exercise/ExerciseDetail.js"

export const WorkoutDetail = () => {
    const { getWorkoutById, removeWorkout } = useContext(WorkoutContext);
    const { deleteExercise } = useContext(ExerciseContext)

    const [workout, setWorkout] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {workoutId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeWorkout(workout.id)
      .then(() => history.push("/workouts"));
  };
  //refreshes page whenever a change is made
  const refreshWorkout = () => {
    getWorkoutById(workoutId)
      .then((response) => {
        setWorkout(response)


      })

  }
  const exerciseDelete = (exerciseId) => {
    deleteExercise(exerciseId)
      .then(() => {
        refreshWorkout()
      })
  }

  useEffect(() => {
    getWorkoutById(workoutId)
    .then((response) => setWorkout(response));
    refreshWorkout()
    }, // eslint-disable-next-line
    []);

    return (
      <section className="workout">
         <button className="backBtn" onClick={() => history.goBack()}>Back</button>
        <h3 className="workout__name">{workout.name}</h3>
        {/* <div className="workout__name">Date: {workout.timestamp}</div> */}
        <div className="workout__name">Date: { new Date(workout.timestamp).toLocaleDateString('en-US')  }</div>
        <div className="workout__name">Journal: {workout.logEntry}</div>
        <div className="workout__notes">Mood: {workout.workoutMood}</div>
        <button className='edit__workout' onClick={() => {
          history.push(`/workouts/edit/${workout.id}`)
        }}>Edit workout</button>
    
        <button className='deleteBtn' onClick={handleRemoving}>Delete Workout</button>
        
        <button className='add__workout' onClick={() => {
          history.push(`/exercises/create/${workout.id}`)
        }}>Add New Exercise</button>

        <div className="exerciseCards">
          {
            workout.exercises?.map(e => {
              e.workout = workout
              return <ExerciseDetail key={e.id} exercise={e} exerciseDelete={exerciseDelete} refreshWorkout={refreshWorkout} />
            })}
        </div>
      </section>
    
    )
} 