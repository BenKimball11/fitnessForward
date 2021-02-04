import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { WorkoutContext } from "./WorkoutProvider";
import "./Workout.css";


export const WorkoutForm = () => {
    const { addWorkout, getWorkoutById, updateWorkout } = useContext(WorkoutContext);

    // For edit, hold on to state of workout in this view
    // You need an initial state for it to allow you to edit it
    const [workout, setWorkout] = useState({
      name: "",
      address: "",
      logEntry: "",
      date: Date.now(),
      workoutMood: ""
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
      if (parseInt(workout.name || workout.timestamp || workout.workoutMood || workout.logEntry) === "") {
          window.alert("Please fill out the name and address fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (workoutId){
          //PUT - update
          updateWorkout({
            id: workout.id,
            timestamp: Date(),
            name: workout.name,
            workoutMood: workout.workoutMood,
            logEntry: workout.logEntry,
          })
          .then(() => history.push(`/workouts/detail/${workout.id}`))
        }else {
          //POST - add
          addWorkout({
            id: workout.id,
            timestamp: Date(),
            name: workout.name,
            workoutMood: workout.workoutMood,
            logEntry: workout.logEntry,
          })
          .then(() => history.push("/workouts"))
        };
      };
    };

    // Get workouts. If workoutId is in the URL, getworkoutById
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
      <form className="workoutForm">
        <h2 className="workoutForm__title">{workoutId ? <>Edit Workout</> : <>New Workout</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="workoutName">Workout name: </label>
            <input type="text" id="workoutName" name="name" required autoFocus className="form-control"
            placeholder="workout name"
            onChange={handleControlledInputChange}
            defaultValue={workout.name}/>
          </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="workoutAddress">workout Address: </label>
                <input type="text" id="workoutAddress" name="address" required className="form-control"
                placeholder="workout address"
                onChange={handleControlledInputChange}
                defaultValue={workout.address} />
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
}; 
/* mport React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "../exercise/ExerciseProvider"
import { WorkoutContext } from "../workout/WorkoutProvider"
//import { CustomerContext } from "../customer/CustomerProvider"
import "./Workout.css"
import { useHistory, useParams } from 'react-router-dom';
import { WorkoutList } from "./WorkoutList";
//import "bootstrap/dist/css/bootstrap.min.css"


export const WorkoutForm = () => {
    const { addWorkout, getWorkoutById, updateWorkout } = useContext(WorkoutContext)
    const { exercises, getExercise } = useContext(ExerciseContext)
    //const { customers, getCustomers } = useContext(CustomerContext)

    //for edit, hold on to state of animal in this view
    const [workout, setWorkout,] = useState({
      workoutName: "",
      logEntry: "",
      date: Date.now(),
      user: 0,
      workoutMood: ""
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
      if (parseInt(workout.exerciseId) === 0) {
          window.alert("Please select an exercise")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (workoutId){
          //PUT - update
          updateWorkout({
              id: workout.id,
              timestamp: Date(),
              workoutName: workout.workoutName,
              workoutMood: workout.workoutMood,
              logEntry: workout.logEntry,
              userId: workout.userId
          })
          .then(() => history.push(`/workouts/detail/${workout.id}`))
        }else {
          //POST - add
          addWorkout({
              workoutName: workout.workoutName,
              timestamp: Date(),
              workoutMood: workout.workoutMood,
              userId: workout.userId,
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
            <input type="text" id="workoutName" name="workoutName" required autoFocus className="form-control"
            placeholder="Workout name"
            onChange={handleControlledInputChange}
            value={workout.name}/>
          </div>
        </fieldset>
             Date dropdown 
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


        <fieldset>
        <div className="form-group">
              <label htmlFor="workoutMood<">Workout Mood:</label>
              <input type="text" name="workoutMood" id="workoutMood" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Mood" value={workout.workoutMood}/>
        </div>
        </fieldset>
       
        <button className="btn btn-primary"
          
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveWorkout()
          }}>
        {workoutId ? <>Save Workout</> : <>Add Workout</>}</button> 
        <div className="workouts"></div>
    <div className="workouts">
        {console.log("WorkoutList: Render", workout)} 
      {
        exercises.map(workout => {
          return <WorkoutForm key={workout.id} workout={workout} />
        })
      }
    </div>
      </form>
    )
}  */