import React, { useContext, useEffect, useState } from "react";
import { ExerciseContext } from "./ExerciseProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./Exercise.css";


export const ExerciseForm = () => {
    const { addExercise, getExerciseById, updateExercise } = useContext(ExerciseContext);
    /* useState declares the default state of the functions.
    First thing in the array (workout) is always the current state
    second thing in the array (setWorkout) allows you to update the current state   */
    const [exercise, setExercise] = useState({})
         

    
      //const [isLoading, setIsLoading] = useState(true)
      const {exerciseId, workoutId} = useParams()
      
      const history = useHistory()
      
      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newExercise = { ...exercise }
        //workout is an object with properties.
        //set the property to the new value
        newExercise[event.target.id] = event.target.value
        //update state
        setExercise(newExercise)
      }
    
    const handleSaveExercise = () => {
    const user = localStorage.getItem("fitnessforward_user")

    if (exercise.workoutId === 0 || exercise.name === "" || exercise.weightUsed === "" || exercise.restInterval === "")  {
      window.alert("Please fill out the fields")
    } else {
      //setIsLoading(true);
      if (exerciseId){
        updateExercise({
          id: parseInt(exercise.id),
          workoutId:parseInt(exercise.workoutId),
          userId: parseInt(user),
          name: exercise.name,
          weightUsed: exercise.weightUsed,
          restInterval: exercise.restInterval,
        })
        .then(() => history.push(`/workouts/detail/${exercise.workoutId}`))
      }else{
        
       // setIsLoading(true);
        addExercise({
          id: parseInt(exercise.id),
          userId: parseInt(user),
          workoutId:parseInt(workoutId),
          name: exercise.name,
          weightUsed: exercise.weightUsed,
          restInterval: exercise.restInterval,
        })
        .then(() => history.push(`/workouts/detail/${workoutId}`))
      }
    }
  }

  // Populates the forms with existing data if there is any
    useEffect(() => {
        if (exerciseId){
          getExerciseById(exerciseId)
          .then(exercise => {
              setExercise(exercise)
             // setIsLoading(false)
          })
        } else {
          //setIsLoading(false)
        }
    }, 
    [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="exerciseForm">
         <h2 className="exerciseForm__title">{exerciseId ? <>Edit exercise</> : <>New exercise</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Exercise:</label>
                  <input defaultValue={exercise.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Ex: deadlift" value={exercise.name}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="weightUsed">Weight Used:</label>
                  <input defaultValue={exercise.weightUsed} type="text" id="weightUsed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Ex: 135 lbs" value={exercise.weightUsed}/>
              </div>
             
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="restInterval">Rest Interval:</label>
                  <input defaultValue={exercise.restInterval?.workoutId} type="text" id="restInterval" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="60 seconds" value={exercise.restInterval}/>
              </div>
             
          </fieldset>
          <button className="btn btn-primary"
          //disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveExercise();
          }}>
     {exerciseId ? <>Save exercise</> : <>Add exercise</>}</button> 
          
      </form>
    )
} 