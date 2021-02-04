/* import React, { useContext, useEffect } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseCard } from "./ExerciseCard"
import "./Exercise.css"
import { useHistory } from "react-router-dom"

export const ExerciseList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { exercises, getExercise } = useContext(ExerciseContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("exerciseList: useEffect - getExercise")
    getExercise()

  }, [])

  const history = useHistory()

  return (
    <>
     <h2>Exercises</h2>
            <button onClick={() => {history.push("/exercises/create")}}>
                Add Exercise
            </button>
        <div className="Exercises"></div>
    <div className="Exercises">
      {console.log("ExerciseList: Render", exercises)}
      {
        exercises.map(exercise => {
          return <ExerciseCard key={exercise.id} exercise={exercise} />
        })
      }
    </div>
    </>
  )
} */


import React, { useContext, useEffect } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseCard } from "./ExerciseCard"
import "./Exercise.css"
import { useHistory } from "react-router-dom"
import { WorkoutContext } from "../workout/WorkoutProvider"

export const ExerciseList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { exercises, getExercises } = useContext(ExerciseContext)
  const { workouts, getWorkouts } = useContext(WorkoutContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getemployees")
    getWorkouts()
    .then(getExercises)

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (
        <>
            <h2>Exercises</h2>
                <button onClick={() => {history.push("/exercises/create")}}>
                    Add Exercise
                </button> 
            <div className="exercises">
            {console.log(workouts)}
            {
                exercises.map(exercise => {
                    const clinic = workouts.find(w => w.id === exercise.workoutId)

                    return <ExerciseCard key={exercise.id}        
                                workout={clinic}
                                exercise={exercise} />
                })
            }
            </div>
        </>
  )
}