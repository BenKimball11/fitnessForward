import React, { useContext, useEffect } from "react"
import { WorkoutExerciseContext } from "./WorkoutExerciseProvider"
import { WorkoutExerciseCard } from "./WorkoutExerciseCard"
import "./WorkoutExercise.css"
import { useHistory } from "react-router-dom"

export const WorkoutExerciseList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { workoutExercises, getWorkoutExercise } = useContext(WorkoutExerciseContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("ExerciseList: useEffect - getExercise")
    getWorkoutExercise()

  }, [])

  const history = useHistory()

  return (
    <>
     <h2>Exercises</h2>
            <button onClick={() => {history.push("/workoutExercises/create")}}>
                Add Exercise
            </button>
        <div className="workoutExercises"></div>
    <div className="workoutExercises">
      {console.log("WorkoutExerciseList: Render", workoutExercises)}
      {
        workoutExercises.map(workoutExercise => {
          return <WorkoutExerciseCard key={workoutExercise.id} workoutExercise={workoutExercise} />
        })
      }
    </div>
    </>
  )
}