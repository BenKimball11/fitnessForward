import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { ExerciseContext } from "./ExerciseProvider";
import "./Exercise.css";


export const ExerciseForm = () => {
    const { addExercise, getExerciseById, updateExercise } = useContext(ExerciseContext);

    // For edit, hold on to state of location in this view
    // You need an initial state for it to allow you to edit it
    const [exercise, setExercise] = useState({
      name: "",
      address: ""
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
      if (parseInt(exercise.name || exercise.address) === "") {
          window.alert("Please fill out the name and address fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (exerciseId){
          //PUT - update
          updateExercise({
              id: exercise.id,
              name: exercise.name,
              address: exercise.address
          })
          .then(() => history.push(`/exercises/detail/${exercise.id}`))
        }else {
          //POST - add
          addExercise({
              name: exercise.name,
              address: exercise.address
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
            <label htmlFor="exerciseName">exercise name: </label>
            <input type="text" id="exerciseName" name="name" required autoFocus className="form-control"
            placeholder="exercise name"
            onChange={handleControlledInputChange}
            defaultValue={exercise.name}/>
          </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="exerciseAddress">exercise Address: </label>
                <input type="text" id="exerciseAddress" name="address" required className="form-control"
                placeholder="exercise address"
                onChange={handleControlledInputChange}
                defaultValue={exercise.address} />
            </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveExercise();
          }}>
        {exerciseId ? <>Save Exercise</> : <>Add Exercise</>}</button>
      </form>
    );
};