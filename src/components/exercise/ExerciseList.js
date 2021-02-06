/* import React, { useContext, useEffect } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseCard } from "./ExerciseCard"
import "./Exercise.css"
import { useHistory } from "react-router-dom"
import { ExerciseCard } from "./ExerciseProvider"

export const ExerciseList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { exercises, getExercises } = useContext(ExerciseContext)
  //const { workouts, getWorkouts } = useContext(WorkoutContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    //console.log("EmployeeList: useEffect - getemployees")
    getExercises()
    /* .then(getExercises)
 
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (
        <section className="exercise"></section>
   {/*  <h2>Exercises</h2> *
            <button className= 'addExerciseButton' onClick={() => { history.push("/exercises/create")}}>
                    Add Exercise
            </button>  
            <div className="exerciseCards">
            {
                exercises.map(e =>  {
                    return <ExerciseCard key={e.id}  exercise={e} />                   
                })
            }
            </div>
        </section> 
  )
} */

import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseContext } from "./ExerciseProvider";

export const ExerciseList = () => {

  const { exercise, getExercise } = useContext(ExerciseContext)


  useEffect(() => {
    getExercise()
  }, [])

  const history = useHistory()



  return (
    <section className="exercises">
      <button className="backBtn" onClick={() => history.goBack()}>Back</button>

      {console.log("ExerciseList:Render", exercise)}
      <h2>Exercise</h2>
      <button className='addExerciseBtn' onClick={() => { history.push("/exercises/create") }}>
        Add New Exercise
          </button>
      <div className="exerciseCards">
        {
          exercise.map(e => {
            return <ExerciseCard key={e.id} exercises={e} />
          })
        }

      </div>
    </section>

  )

}