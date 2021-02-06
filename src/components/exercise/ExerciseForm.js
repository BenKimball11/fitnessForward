import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "../workout/WorkoutProvider"
import { ExerciseContext } from "./ExerciseProvider"
import "./Exercise.css"
import { useHistory, useParams } from 'react-router-dom';

export const ExerciseForm = () => {
    const { addExercise, updateExercise, getExerciseById } = useContext(ExerciseContext)
    const { workouts, getWorkouts,  deleteExercise } = useContext(WorkoutContext)
    //const [exercise, setExercise ] = useState({})
    const user = localStorage.getItem("fitnessforward_user")
    

 /*    const [isLoading, setIsLoading] = useState(true);
    const {exerciseId} = useParams();
    
    const history = useHistory();

    useEffect(() => {
      getWorkouts()
      .then(() => {
        if (exerciseId){
          getExerciseById(exerciseId)
          .then(exericise => {
            setExercise(exericise)
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      
      })
    }, [])
    
    const handleControlledInputChange = (event) => {
      const newExercise = { ...exercise }
      
      
      newExercise[event.target.id] = event.target.value
      
      
      setExercise(newExercise)
    }
    
    const handleClickSaveExercise = () => {
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
        .then(() => history.push(`/exercises/detail/${exercise.id}`))
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
    []); */
          const [exercise, setExercise] = useState({
         
         
            name: "",
            workoutId: 0,
            weightUsed: "",
            restInterval: ""
          });
         
          const history = useHistory();
         
          useEffect(() => {
            getWorkouts()
          }, []) // eslint-disable-line react-hooks/exhaustive-deps
         
         
         
          
          const handleControlledInputChange = (event) => {
         
            const newExercise = { ...exercise }
           
            newExercise[event.target.id] = event.target.value
            // update state
            setExercise(newExercise)
          }
         
          const handleClickSaveExercise = (event) => {
            event.preventDefault() //Prevents the browser from submitting the form
         
            const workoutId = parseInt(exercise.workoutId)
         
            if (workoutId === 0) {
              window.alert("Please select a workout")
            } else {
              exercise.workoutId = workoutId
              addExercise(exercise)
              .then(() => history.push(`/workouts/detail/${exercise.workoutId}`))
            }
          } 
  
  
    return (
      <form className="exerciseForm">
          <h2 className="exerciseForm__title">New Exercise</h2>
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
                  <label htmlFor="name">Exercise name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Exercise name" value={exercise.name}/>
              </div>
          </fieldset>
          <fieldset>
          <div className="form-group">
            <label htmlFor="weightUsed">Weight used: </label>
            <input type="text" id="weightUsed" name="weightUsed" required autoFocus className="form-control"
            placeholder="Ex: 135 lbs"
            onChange={handleControlledInputChange}
            defaultValue={exercise.weightUsed}/>
          </div>
          </fieldset>
          <fieldset>
          <div className="form-group">
            <label htmlFor="restInterval">Rest Intervals: </label>
            <input type="text" id="restInterval" name="restInterval" required autoFocus className="form-control"
            placeholder="Ex: 60 seconds"
            onChange={handleControlledInputChange}
            defaultValue={exercise.restInterval}/>
          </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveExercise}>
            Save Exercise
          </button>
      </form>
    )
  }  
  
  
/* import React, { useContext, useEffect, useState } from "react";
import { WorkoutContext } from '../workout/WorkoutProvider';
import { useHistory, useParams } from 'react-router-dom'
import { ExerciseContext } from "./ExerciseProvider";
import "./Exercise.css"



export const ExerciseForm = () => {
    const { workouts, getworkouts } = useContext(WorkoutContext)
    const { getExercise, addExercise, getExerciseById, updateExercise, deleteExercise } = useContext(ExerciseContext)
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState({});

    const history = useHistory();
    const {exerciseId}  = useParams();
   
   

    useEffect(() => {
      getExercise()
      .then(() => {
        if (exerciseId){
          getExerciseById(exerciseId)
          .then(exercise => {
            setExercise(exercise)
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      
      })
    }, [])

    
    const handleControlledInputChange = (event) => {
    
      const newMainEvent = { ...exercise }
      
     
      newMainEvent[event.target.id] = event.target.value
      
      setExercise(newMainEvent)
    }

    
    const handleClickSaveExercise = (event) => {
    {
      event.preventDefault()

      
      const user = localStorage.getItem("fitnessforward_user")
      
      if (exerciseId) {
        updateExercise({
          id: parseInt(exercise.id),
          userId: parseInt(user),
          weightUsed: exercise.weightUsed,
          workoutId:exercise.workoutId,
          restInterval: exercise.restInterval,
    
        })
        .then(() => history.push('../'))
      }  else {
        setIsLoading(true)
        addExercise({
          userId: parseInt(user),
          weightUsed: exercise.weightUsed,
          workoutId:parseInt(exercise.workoutId),
          restInterval: exercise.toComplete,

    
        })
        .then(() => history.push(`/workouts/detail/${exercise.workoutId}`))
      }
    }
  }

    return (
      <form className="exerciseForm">
       <button className="backBtn" onClick={() => history.goBack()}>Back</button>
          <h2 className="exerciseForm__title">Enter exercise</h2>
          <fieldset>
              <div className="form-group-workout">
                  <label htmlFor="workout">Assign to workout: </label>
                  <select  name="workoutId" id="workoutId" onChange={handleControlledInputChange} className="form-control" >
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
            onClick={handleClickSaveExercise}>
            Save exercise Event
          </button>
          
      </form>
    )
} */