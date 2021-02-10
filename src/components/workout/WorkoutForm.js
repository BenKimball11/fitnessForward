import React, { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "./WorkoutProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./Workout.css";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react'


export const WorkoutForm = () => {
    const { addWorkout, getWorkoutById, updateWorkout } = useContext(WorkoutContext);

     /* useState declares the default state of the functions.
    First thing in the array (workout) is always the current state
    second thing in the array (setWorkout) allows you to update the current state   */
    const [workout, setWorkout] = useState({
       name: "",
      date: "" 
    })

    
      const [isLoading, setIsLoading] = useState(true);
      const {workoutId} = useParams();
      
      const history = useHistory();
      
      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
      //always create a copy make changes, and then set state.
        const newWorkout = { ...workout }
        //workout is an object with properties.
      //set the property to the new value
        newWorkout[event.target.id] = event.target.value
        //update state
        setWorkout(newWorkout)
      }
    
    const handleSaveWorkout = () => {
    const user = localStorage.getItem("fitnessforward_user")
    const name = workout.name
    const timestamp = workout.date
    
    

      if (workout.name === "" || workout.timestamp === "" || workout.workoutMood === "" || workout.logEntry=== "")  {
          window.alert("Please fill out the fields")
      } else {
  
       setIsLoading(true);
        if (workoutId){
          updateWorkout({
            id: parseInt(workout.id),
            userId: parseInt(user),
            date: timestamp,
            name: name,
            workoutMood: workout.workoutMood,
            logEntry: workout.logEntry,
          })
          .then(() => history.push(`/workouts/detail/${workout.id}`))
        }else {
         
          addWorkout({
           // id: parseInt(workout.id),
            userId: parseInt(user),
            date: timestamp,
            name: workout.name,
            workoutMood: workout.workoutMood,
            logEntry: workout.logEntry,
          })
          .then(() => history.push("/workouts"))
        }
      }
    }

    // Populates the forms with existing data if there is any
    useEffect(() => {
        if (workoutId){
          getWorkoutById(workoutId)
          .then(workout => {
              setWorkout(workout);
              setIsLoading(false);
          })
        } else {
          setIsLoading(false);
        }
    }, 
    []);

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="workoutForm">
      {/* checks to see if there is data alright in the workoutId */}
        <h2 className="workoutForm__title">{workoutId ? <>Edit Workout</> : <>New Workout</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Workout name: </label>
            <input type="text" id="name" name="name" required autoFocus className="form-control"
            placeholder="workout name"
            onChange={handleControlledInputChange}
            value={workout.name}/>
          </div>
        </fieldset>

        
        <fieldset>
          <div className="form-group">
            <label htmlFor="date">Workout date: </label>
            <input type="date" id="date" name="date" required autoFocus className="form-control"
            placeholder="Workout Date"
            onChange={handleControlledInputChange}
            value={workout.date}/>
          </div>
        </fieldset> 
        <fieldset>
          <div className="form-group">
              <label htmlFor="focus">Journal:</label>
              <textarea type="text" name="logEntry" id="logEntry" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Entry" value={workout.logEntry}/>
          </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
              <label htmlFor="workoutMood<">Workout Mood:</label>
              <input type="text" name="workoutMood" id="workoutMood" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Mood" value={workout.workoutMood}/>
        </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveWorkout();
          }}>
     {workoutId ? <>Save Workout</> : <>Add Workout</>}</button> 
          
      </form>
    )
} 