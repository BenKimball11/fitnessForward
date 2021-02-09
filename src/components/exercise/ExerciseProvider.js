import React, { useState, createContext } from "react"

// createContext() makes an object with properties
export const ExerciseContext = createContext();

// This component establishes what data can be used.
export const ExerciseProvider = (props) => {
    const [exercise, setExercise] = useState([])

    const getExercise = () => {
        //embed lists of exercises that are associated with the workout
        return fetch("http://localhost:8088/exercises?_embed=workouts")
        .then(res => res.json())
        .then(setExercise);
    };

    const getExerciseById = (id) => {
        //embed lists of exercises that are associated with the workout
        return fetch(`http://localhost:8088/exercises/${id}?_embed=workouts`)
            .then(res => res.json());
    };

    const addExercise = exerciseObj => {
        return fetch("http://localhost:8088/exercises?_embed=workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseObj)
        })
        .then(getExercise);
    };

    const updateExercise = exercise => {
        return fetch(`http://localhost:8088/exercises/${exercise.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(exercise)
        })
          .then(getExercise);
      };

    const deleteExercise= exerciseId => {
        return fetch(`http://localhost:8088/exercises/${exerciseId}`, {
            method: "DELETE"
        })
        .then(getExercise);
    };

    // Subcomponent that renders a subset of itself called a Provider
    // Provider = Interface that other components can use in order to gain access
    // to what the provider holds.
    return (
        <ExerciseContext.Provider value={{exercise, getExercise, getExerciseById, addExercise, updateExercise, deleteExercise}}>
            {props.children}
        </ExerciseContext.Provider>
    );
}; 
