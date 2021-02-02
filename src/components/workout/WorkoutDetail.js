import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { WorkoutContext } from "./WorkoutProvider.js";
import "./Workout.css";
import "bootstrap/dist/css/bootstrap.min.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export const WorkoutDetail = () => {
    const { getWorkoutById, removeWorkout } = useContext(WorkoutContext);

    // This is one location so it is an object, not an array
    const [workout, setWorkout] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {workoutId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeWorkout(workout.id)
      .then(() => history.push("/workouts"));
  };

  useEffect(() => {
    getWorkoutById(workoutId)
    .then((response) => setWorkout(response));
    }, // eslint-disable-next-line
    []);

  return (
    <section className="workout">
      <h3 className="workout__name">{workout.name}</h3>
      <div className="workout__date">Date: {workout.date}</div>
      <div className="workout__exercises">
          <h4 className="workout__exercises__header">Exercises</h4>
          <div className="workout__exercises__names">
            {workout.exercise?.map(exercise => exercise.name).join(", ")}
          </div>
      </div>
      <button onClick={handleRemoving}>Remove Workout</button>
      <button onClick={() => {
          history.push(`/workouts/edit/${workout.id}`)
      }}>Edit</button>
    </section>
  );
};