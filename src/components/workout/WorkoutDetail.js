import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams, Link } from "react-router-dom";
import { WorkoutContext } from "./WorkoutProvider.js";
import "./Workout.css";
import { ExerciseContext } from "../exercise/ExerciseProvider.js"
import { ExerciseDetail } from "../exercise/ExerciseDetail.js"

export const WorkoutDetail = () => {
    const { getWorkoutById, removeWorkout } = useContext(WorkoutContext);
    //const { getExerciseById, removeExercise } = useContext(ExerciseContext)
    const { deleteExercise } = useContext(ExerciseContext)

    //const [exercise, setExercise] =useState({})
    const [workout, setWorkout] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {workoutId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeWorkout(workout.id)
      .then(() => history.push("/workouts"));
  };
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
        <div className="workout__name">Date: {workout.timestamp}</div>
        <div className="workout__name">Journal: {workout.logEntry}</div>
        <div className="workout__notes">Mood: {workout.workoutMood}</div>
        <button className='edit__workout' onClick={() => {
          history.push(`/workouts/edit/${workout.id}`)
        }}>Edit workout</button>
    
        <button className='deleteBtn' onClick={handleRemoving}>Delete Workout</button>
        <button className="exerciseItem"> <Link to={`../../exercises/create`}>Add New exercise</Link></button>
        <div className="exerciseCards">
          {
            workout.exercises?.map(e => {
              e.workout = workout
              console.log(e)
              return <ExerciseDetail key={e.id} exercise={e} exerciseDelete={exerciseDelete} refreshWorkout={refreshWorkout} />
            })}
        </div>
      </section>
    
    )
  /* return (
      
      <section className="workout">
        <button className="workout__removeButton" onClick={handleRemoving}> Remove workout</button>
        <button onClick={() => {
            history.push(`/workouts/edit/${workout.id}`)
        }}>Edit</button>
        <h3 className="workout__name">{workout.name}</h3>
        <div className="workout__date">Date: {workout.timestamp}</div>
        {/* What's up with the question mark???? See below.*
        <div className="workout__entry">Entry: {workout.logEntry}</div>
        <div className="workout__mood">Mood: {workout.workoutMood}</div>
        <div className="workout__exercises">
        <button onClick={() => {history.push("/exercises/create")}}>
                    Add Exercise
        </button> 
          <h4 className="workout__exercises__header">Exercises</h4>
          <div className="workout__exercises__names">
            {workout.exercises?.map(exercise => exercise.name).join(", ")}
          </div>
      </div>
      </section>
    )
}; */

} 