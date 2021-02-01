import React, { useContext, useEffect } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseCard } from "./ExerciseCard"
import "./Exercise.css"
import { useHistory } from "react-router-dom"

export const ExerciseList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { exercises, getExercises } = useContext(ExerciseContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("ExerciseList: useEffect - getExercise")
    getExercises()

  }, [])

  const history = useHistory()

  return (
    <>
     <h2>Exercises</h2>
            <button onClick={() => {history.push("/exercises/create")}}>
                Add Exercise
            </button>
        <div className="exercises"></div>
    <div className="exercises">
      {console.log("ExerciseList: Render", exercises)}
      {
        exercises.map(exercise => {
          return <ExerciseCard key={exercise.id} exercise={exercise} />
        })
      }
    </div>
    </>
  )
}