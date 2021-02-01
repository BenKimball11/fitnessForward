import React from "react";
/* import { PropsAndState } from './PropsAndState' */

export const Home = () => (
    <>
        <h2>Fitness Forward</h2>
        <small>Loving care when you're not there.</small>

      {/*   <PropsAndState yourName={"Brenda"} /> */}
    </>
)


/* import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { WorkoutContext } from "./WorkoutProvider";
import "./Workout.css";


export const WorkoutForm = () => {
    const { addWorkout, getWorkoutById, updateWorkout } = useContext(WorkoutContext);

    // For edit, hold on to state of location in this view
    // You need an initial state for it to allow you to edit it
    const [workout, setWorkout] = useState({
      name: "",
      type: ""
    });

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {workoutId} = useParams();
    
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newWorkout = { ...workout };

      //location is an object with properties.
      //set the property to the new value
      newWorkout[event.target.name] = event.target.value;
      
      //update state
      setWorkout(newWorkout);
    };

    const handleSaveWorkout = () => {
      if (parseInt(workout.name || workout.type) === "") {
          window.alert("Please fill out the name and type fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (workoutId){
          //PUT - update
          updateWorkout({
              id: workout.id,
              name: workout.name,
              type: workout.type
          })
          .then(() => history.push(`/workouts/detail/${workout.id}`))
        }else {
          //POST - add
          addWorkout({
              name: workout.name,
              type: workout.type
          })
          .then(() => history.push("/workouts"))
        };
      };
    };

    // Get locations. If locationId is in the URL, getLocationById
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
    }, // eslint-disable-next-line
    []);

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="locationForm">
        <h2 className="locationForm__title">{workoutId ? <>Edit Workout</> : <>New Workout</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="locationName">Location name: </label>
            <input type="text" id="locationName" name="name" required autoFocus className="form-control"
            placeholder="Location name"
            onChange={handleControlledInputChange}
            defaultValue={workout.name}/>
          </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="workoutType">Workout Type: </label>
                <input type="text" id="workouttype" name="type" required className="form-control"
                placeholder="Workout type"
                onChange={handleControlledInputChange}
                defaultValue={workout.type} />
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
    );
}; */