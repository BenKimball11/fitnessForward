import React, { useContext, useEffect, useState } from "react"
import { WorkoutExerciseContext } from "../exercise/WorkoutExerciseProvider"
import { WorkoutContext } from "../workout/WorkoutProvider"
//import { CustomerContext } from "../customer/CustomerProvider"
import "./Workout.css"
import { useHistory, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"


export const WorkoutForm = () => {
    const { addWorkout, getWorkoutById, updateWorkout } = useContext(WorkoutContext)
    const { workoutExercises, getWorkoutExercise } = useContext(WorkoutExerciseContext)
    //const { customers, getCustomers } = useContext(CustomerContext)

    //for edit, hold on to state of animal in this view
    const [workout, setWorkout] = useState({
      workoutName: "",
      logEntry: "",
      date: Date.now(),
      userId: 0,
      workoutMoodId:0
    })

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const { workoutId } = useParams();
	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newWorkout = { ...workout }
      //animal is an object with properties.
      //set the property to the new value
      newWorkout[event.target.name] = event.target.value
      //update state
      setWorkout(newWorkout)
    }

    const handleSaveWorkout = () => {
      if (parseInt(workout.workoutExerciseId) === 0) {
          window.alert("Please select an exercise")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (workoutId){
          //PUT - update
          updateWorkout({
              id: workout.id,
              date: workout.timestamp,
              name: workout.workoutName,
              workoutMoodId: workout.workoutMoodId,
              logEntry: workout.logEntry,
              userId: parseInt(workout.userId)
          })
          .then(() => history.push(`/workouts/detail/${workout.id}`))
        }else {
          //POST - add
          addWorkout({
              name: workout.workoutName,
              date: workout.Date(),
              workoutMoodId: parseInt(workout.workoutMoodId),
              userId: parseInt(workout.userId),
              logEntry: workout.logEntry
          })
          .then(() => history.push("/workouts"))
        }
      }
    }

    return (
      <form className="workoutForm">
        <h2 className="workoutForm__title">{workoutId ? "Edit Workout" : "Add Workout"}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="workoutName">Workout name: </label>
            <input type="text" id="workoutName" name="name" required autoFocus className="form-control"
            placeholder="Workout name"
            onChange={handleControlledInputChange}
            value={workout.name}/>
          </div>
        </fieldset>
            {/* Date dropdown */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="date">Workout date: </label>
            <input type="date" id="workoutDate" name="workoutDate" required autoFocus className="form-control"
            placeholder="Workout Date"
            onChange={handleControlledInputChange}
            value={workout.Date}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
              <label htmlFor="focus">Journal:</label>
              <textarea type="text" name="logEntry" id="logEntry" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Entry" value={workout.logEntry}/>
          </div>
        </fieldset>
        {/* Create a add an exercise movement button with drop downs within this fieldset */}

        <fieldset>
          <div className="form-group">
            <label htmlFor="exercise">Add a exercise: </label>
            <select value={workout.exercisesId} name="exercisesId" id="exercises" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select an exercise</option>
              {workoutExercises.map(e=> (
                <option key={e.id} value={e.id}>
                  {e.name} 
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveWorkout()
          }}>
        {workoutId ? <>Save Workout</> : <>Add Workout</>}</button>
            <button onClick={() => {history.push("/workouts/create")}}>
                Add Another Exercise
            </button>
        <div className="workouts"></div>
    <div className="workouts">
      {/* {console.log("WorkoutList: Render", workouts)} */}
      {
        workoutExercises.map(workout => {
          return <WorkoutForm key={workout.id} workout={workout} />
        })
      }
    </div>
      </form>
    )
}