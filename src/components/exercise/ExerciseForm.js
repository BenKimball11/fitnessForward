import React, { useContext, useEffect, useState } from "react";
import { ExerciseContext } from "./ExerciseProvider";
import { WorkoutContext } from "../workout/WorkoutProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Exercise.css";


export const ExerciseForm = () => {
    const { addExercise, getExerciseById, updateExercise } = useContext(ExerciseContext);
    const [exercise, setExercise] = useState({})
         

    const { workouts, getWorkouts,  deleteExercise } = useContext(WorkoutContext)
    
      const [isLoading, setIsLoading] = useState(true);
      const {exerciseId} = useParams();
      
      const history = useHistory();
      
      const handleControlledInputChange = (event) => {
        const newExercise = { ...exercise }
        
        
        newExercise[event.target.id] = event.target.value
        
        
        setExercise(newExercise)
      }
    
    const handleSaveExercise = () => {
    const user = localStorage.getItem("fitnessforward_user")

    if (exercise.workoutId === "" || exercise.name === "" || exercise.weightUsed === "" || exercise.restInterval === "")  {
      window.alert("Please fill out the fields")
    } else {
      setIsLoading(true);
      if (exerciseId){
        updateExercise({
          id: parseInt(exercise.id),
          workoutId:exercise.workoutId,
          userId: parseInt(user),
          name: exercise.name,
          weightUsed: exercise.weightUsed,
          restInterval: exercise.restInterval,
        })
        .then(() => history.push(`/workouts`))
      }else {
        
        addExercise({
          id: parseInt(exercise.id),
          userId: parseInt(user),
          workoutId:exercise.workoutId,
          name: exercise.name,
          weightUsed: exercise.weightUsed,
          restInterval: exercise.restInterval,
        })
        .then(() => history.push("/workouts"))
      }
    }
  }

    useEffect(() => {

        if (exerciseId){
          getExerciseById(exerciseId)
          .then(exercise => {
              setExercise(exercise);
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
      <form className="exerciseForm">
        <h2 className="exerciseForm__title">{exerciseId ? <>Edit exercise</> : <>New exercise</>}</h2>
        <fieldset>
        <div className="form-group">
                  <label htmlFor="workout">Assign to workout: </label>
                  <select defaultValue={exercise.workoutId} name="workoutId" id="workoutId" className="form-control" onChange={handleControlledInputChange}>
                      <option value="0">Select a workout</option>
                      {workouts.map(w => (
                          <option key={w.id} value={w.id}>
                              {w.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Exercise:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Ex: deadlift" value={exercise.name}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="weightUsed">Weight Used:</label>
                  <input type="text" id="weightUsed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Ex: 135 lbs" value={exercise.weightUsed}/>
              </div>
             
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="restInterval">Rest Interval:</label>
                  <input type="text" id="restInterval" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="60 seconds" value={exercise.restInterval}/>
              </div>
             
          </fieldset>
          <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveExercise();
          }}>
     {exerciseId ? <>Save exercise</> : <>Add exercise</>}</button> 
          
      </form>
    )
} 