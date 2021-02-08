import React, { useContext, useEffect, useParams } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"
import { useHistory } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"

export const WorkoutList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { workouts, getWorkouts } = useContext(WorkoutContext)
  //const {exerciseId, workoutId} = useParams();

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("WorkoutList: useEffect - getWorkouts")
    getWorkouts()

  }, [])

  const history = useHistory()

  return (
    <>
     <h2>Previous Workouts</h2>
           <button onClick={() => {history.push("/workouts/create")}}>
                Add Workout
            </button>  
        <div className="workouts"></div>
    <div className="workouts">
      {console.log("WorkoutList: Render", workouts)}
      {
        workouts.map(workout => {
          return <WorkoutCard key={workout.id} workout={workout} />
        })
      }
    </div>
    </>
  )
}