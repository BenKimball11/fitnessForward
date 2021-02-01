import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { ExerciseContext } from "./ExerciseProvider.js";
import "./Exercise.css";

export const ExerciseDetail = () => {
    const { getExerciseById, removeExercise } = useContext(ExerciseContext);

    // This is one location so it is an object, not an array
    const [exercise, setExercise] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {exerciseId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeExercise(exercise.id)
      .then(() => history.push("/exercises"));
  };

  useEffect(() => {
    getExerciseById(exerciseId)
    .then((response) => setExercise(response));
    }, // eslint-disable-next-line
    []);

  return (
    <section className="exercise">
      <h3 className="exercise__name">{exercise.name}</h3>
      <div className="exercise__address">Address: {exercise.address}</div>
      <div className="exercise__employees">
          <h4 className="exercise__employees__header">Employees</h4>
          <div className="exercise__employees__names">
            {exercise.employees?.map(employee => employee.name).join(", ")}
          </div>
      </div>
      <div className="exercise__animals">
          <h4 className="exercise__animals__header">Animals</h4>
          <div className="exercise__animals__names">
            {exercise.animals?.map(animal => animal.name).join(", ")}
          </div>
      </div>
      <button onClick={handleRemoving}>Remove Exercise</button>
      <button onClick={() => {
          history.push(`/exercises/edit/${exercise.id}`)
      }}>Edit</button>
    </section>
  );
};