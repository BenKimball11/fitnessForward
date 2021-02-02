import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { WorkoutExerciseContext } from "./WorkoutExerciseProvider";
import "./WorkoutExercise.css";


export const WorkoutExerciseForm = () => {
    const { addWorkoutExercise, getWorkoutExerciseById, updateWorkoutExercise } = useContext(WorkoutExerciseContext);

    // For edit, hold on to state of location in this view
    // You need an initial state for it to allow you to edit it
    const [workoutExercise, setWorkoutExercise] = useState({
      name: "",
      date: "",
      logEntry: "",
      workoutId: 0,
      exerciseId: 0,
      weightUsed: 0,
      restInterval: ""
    });

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {workoutExerciseId} = useParams();
    
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newWorkoutExercise = { ...workoutExercise };

      //location is an object with properties.
      //set the property to the new value
      newWorkoutExercise[event.target.name] = event.target.value;
      
      //update state
      setWorkoutExercise(newWorkoutExercise);
    };

    const handleSaveWorkoutExercise = () => {
      if (parseInt(workoutExercise.name || workoutExercise) === "") {
          window.alert("Please fill out the name and address fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (workoutExerciseId){
          //PUT - update
          updateWorkoutExercise({
              id: workoutExercise.id,
              name: workoutExercise.name,
          })
          .then(() => history.push(`/workoutExercises/detail/${workoutExercise.id}`))
        }else {
          //POST - add
          addWorkoutExercise({
              name: workoutExercise.name,
           
          })
          .then(() => history.push("/workoutExercises"))
        };
      };
    };

    // Get exercises. If exerciseId is in the URL, getexerciseById
    useEffect(() => {
        if (workoutExerciseId){
          getWorkoutExerciseById(workoutExerciseId)
          .then(exercise => {
              setWorkoutExercise(exercise);
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
        <h2 className="exerciseForm__title">{workoutExerciseId ? <>Edit Exercise</> : <>New Exercise</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise name: </label>
            <input type="text" id="exerciseName" name="name" required autoFocus className="form-control"
            placeholder="exercise name"
            onChange={handleControlledInputChange}
            defaultValue={workoutExercise.name}/>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveWorkoutExercise();
          }}>
        {workoutExerciseId ? <>Save Exercise</> : <>Add Exercise</>}</button>
      </form>
    );
};