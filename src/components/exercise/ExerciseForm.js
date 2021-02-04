import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "../workout/WorkoutProvider"
import { ExerciseContext } from "./ExerciseProvider"
import "./Exercise.css"
import { useHistory, useParams } from 'react-router-dom';

export const ExerciseForm = () => {
    const { addExercise } = useContext(ExerciseContext)
    const { workouts, getWorkouts, updateExercise } = useContext(WorkoutContext)

    const [exercise, setExercise] = useState({
      name: "",
      workoutId: 0,
      logEntry: "",
      weightUsed: "",
      restInterval: ""
    });

    const history = useHistory();

    useEffect(() => {
      getWorkouts()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newExercise = { ...exercise }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newExercise[event.target.id] = event.target.value
      // update state
      setExercise(newExercise)
    }

    const handleClickSaveExercise = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      const workoutId = parseInt(workouts.exerciseId)

      if (workoutId === 0) {
        window.alert("Please select a workout")
      } else {
        exercise.workoutId = workoutId
        addExercise(exercise)
        .then(() => history.push("/exercises"))
      }
    }

    return (
      <form className="exerciseForm">
          <h2 className="exerciseForm__title">New Exercise</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Exercise name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Exercise name" value={exercise.name}/>
              </div>
          </fieldset>
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
          <button className="btn btn-primary"
            onClick={handleClickSaveExercise}>
            Save Exercise
          </button>
      </form>
    )
}
/* import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { ExerciseContext } from "./ExerciseProvider";
import "./Exercise.css";


export const ExerciseForm = () => {
    const { addExercise, getExerciseById, updateExercise, workouts} = useContext(ExerciseContext);
    // For edit, hold on to state of location in this view
    // You need an initial state for it to allow you to edit it
    const [exercise, setExercise] = useState({
      name: "",
      logEntry: "",
      exerciseId: 0,
      weightUsed: "",
      restInterval: ""
    });

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {exerciseId} = useParams();
    
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newExercise = { ...exercise };

      //location is an object with properties.
      //set the property to the new value
      newExercise[event.target.name] = event.target.value;
      
      //update state
      setExercise(newExercise);
    };

    const handleSaveExercise = () => {
      if (parseInt(exercise.exerciseId) === 0) { 
          window.alert("Please fill out the name and address fields")
      }else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (exerciseId){
          //PUT - update
          updateExercise({
              id: exercise.id,
              name: exercise.name,
              exerciseId: parseInt(exercise.exerciseId),
              weightUsed: "",
              restInterval: ""
          })
          .then(() => history.push(`/exercises/detail/${exercise.id}`))
        }else {
          //POST - add
          addExercise({
              name: exercise.name,
              exerciseId: parseInt(exercise.exerciseId),
              weightUsed: "",
              restInterval: ""
           
          })
          .then(() => history.push("/exercises"))
        };
      };
    };

    // Get exercises. If exerciseId is in the URL, getexerciseById
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
    }, // eslint-disable-next-line
    []);

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="exerciseForm">
        <h2 className="exerciseForm__title">{exerciseId ? <>Edit Exercise</> : <>New Exercise</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise name: </label>
            <input type="text" id="exerciseName" name="name" required autoFocus className="form-control"
            placeholder="exercise name"
            onChange={handleControlledInputChange}
            defaultValue={exercise.name}/>
          </div>
          <div className="form-group">
            <label htmlFor="weightUsed">Weight used: </label>
            <input type="text" id="weightUsed" name="weightUsed" required autoFocus className="form-control"
            placeholder="Ex: 135 lbs"
            onChange={handleControlledInputChange}
            defaultValue={exercise.weightUsed}/>
          </div>
          <div className="form-group">
            <label htmlFor="restInterval">Rest Intervals: </label>
            <input type="text" id="restInterval" name="restInterval" required autoFocus className="form-control"
            placeholder="Ex: 60 seconds"
            onChange={handleControlledInputChange}
            defaultValue={exercise.restInterval}/>
          </div>
        </fieldset>

{/*         <fieldset>
          <div className="form-group">
            <label htmlFor="WorkoutUsed">Workout used: </label>
            <select value={workouts.exerciseId} name="workoutUsed" id="workoutUsed" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a Workout</option>
              {workouts.map(w => (
                <option key={w.id} value={w.id}>
                    {w.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset> *
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveExercise();
          }}>
        {exerciseId ? <>Save Exercise</> : <>Add Exercise</>}</button>
      </form>
    );
}; */