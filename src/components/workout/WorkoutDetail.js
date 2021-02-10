import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { WorkoutContext } from "./WorkoutProvider.js";
import "./Workout.css";
import { ExerciseContext } from "../exercise/ExerciseProvider.js"
import { ExerciseDetail } from "../exercise/ExerciseDetail.js"

export const WorkoutDetail = () => {
    const { getWorkoutById, removeWorkout } = useContext(WorkoutContext);
    const { deleteExercise } = useContext(ExerciseContext)
    /* useState declares the default state of the functions.
    First thing in the array (workout) is always the current state
    second thing in the array (setWorkout) allows you to update the current state   */
    const [workout, setWorkout] = useState({});

    // useParams returns an object based off the key (workoutId) for example
    /* This is how you access the number 3 inside the component. (<Route exact path="/workouts/detail/:workoutId(\d+)">)
     Now, no matter which workout detail the user wants to view by clicking on any workout's detail link in the list of workouts,
      this one path will match any and all of them, whether there are two workouts or two million. 
      It's part of the routing package (react-router-dom) you installed. */
    const {workoutId} = useParams()

    // function that allows the history to be accessed throught the react-router-dom
    const history = useHistory()

    //
    const handleRemoving = () => {
      removeWorkout(workout.id)
      .then(() => history.push("/workouts"))
  }
  //refreshes page whenever a change is made like deleting a workout
  const refreshWorkout = () => {
    getWorkoutById(workoutId)
      .then((response) => {
        setWorkout(response)
      })
  }
  //Handles deleting exercises associated with the workout Id
  const exerciseDelete = (exerciseId) => {
    deleteExercise(exerciseId)
      .then(() => {
        refreshWorkout()
      })
  }
//gets workout details by ID
  useEffect(() => {
    getWorkoutById(workoutId)
    .then((response) => setWorkout(response));
    refreshWorkout()
    }, // eslint-disable-next-line
    [])

    return (
      <section className="workout">
        <h3 className="workout__name">{workout.name}</h3>
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
            workout.exercises?.map(exercise => {
              exercise.workout = workout
              //Keys help React identify which items have changed, are added, or are removed
              return <ExerciseDetail key={exercise.id} exercise={exercise} exerciseDelete={exerciseDelete} refreshWorkout={refreshWorkout} />
            })}
        </div>
      </section>
    
    )
} 