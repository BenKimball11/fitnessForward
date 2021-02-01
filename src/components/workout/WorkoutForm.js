import React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "../exercise/ExerciseProvider"
import { WorkoutContext } from "../workout/WorkoutProvider"
//import { CustomerContext } from "../customer/CustomerProvider"
import "./Workout.css"
import { useHistory, useParams } from 'react-router-dom';

export const WorkoutForm = () => {
    const { addWorkout, getWorkoutById, updateWorkout } = useContext(WorkoutContext)
    const { exercises, getExercises } = useContext(ExerciseContext)
    //const { customers, getCustomers } = useContext(CustomerContext)

    //for edit, hold on to state of animal in this view
    const [workout, setWorkout] = useState({
      name: "",
      breed: "",
      customerId: 0,
      locationId: 0
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
              name: workout.name,
              breed: workout.breed,
              locationId: parseInt(workout.locationId),
              customerId: parseInt(workout.customerId)
          })
          .then(() => history.push(`/workouts/detail/${workout.id}`))
        }else {
          //POST - add
          addWorkout({
              name: workout.name,
              breed: workout.breed,
              locationId: parseInt(workout.locationId),
              customerId: parseInt(workout.customerId)
          })
          .then(() => history.push("/workouts"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
 /*    useEffect(() => {
      getCustomers().then(getLocations).then(() => {
        if (animalId) {
          getAnimalById(animalId)
          .then(animal => {
              setAnimal(animal)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, []) */

    //since state controlls this component, we no longer need
    //useRef(null) or ref

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
        <fieldset>
          <div className="form-group">
              <label htmlFor="focus">Workout focus:</label>
              <input type="text" name="focus" id="focus" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Workout Focus" value={workout.focus}/>
          </div>
        </fieldset>
        {/* Create a add an exercise movement button with drop downs within this fieldset */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="exercise">Add a exercise: </label>
            <select value={workout.exerciseId} name="exerciseId" id="workoutExercise" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select an exercise</option>
              {exercises.map(e => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
{/*         <fieldset>
          <div className="form-group">
            <label htmlFor="customer">Customer: </label>
            <select value={animal.customerId} name="customerId" id="customerAnimal" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset> */}
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveWorkout()
          }}>
        {workoutId ? <>Save Workout</> : <>Add Workout</>}</button>
      </form>
    )
}