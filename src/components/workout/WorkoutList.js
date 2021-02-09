import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"
import { useHistory } from "react-router-dom"


export const WorkoutList = () => {
  // This state changes when `getWorkouts()` is invoked below
  const { workouts, getWorkouts } = useContext(WorkoutContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
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
      {
        //renders list of workouts from WorkoutCard component
        workouts.map(workout => {
          return <WorkoutCard key={workout.id} workout={workout} />
        })
      }
    </div>
    </>
  )
}