import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
// createContext() makes an object with properties
export const ExerciseContext = createContext();

// This component establishes what data can be used.
export const ExerciseProvider = (props) => {
    const [exercises, setExercise] = useState([])

    const getExercise = () => {
        return fetch("http://localhost:8088/exercises?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setExercise);
    };

    const getExerciseById = (id) => {
        return fetch(`http://localhost:8088/exercises/${id}?_embed=employees&_embed=animals`)
            .then(res => res.json());
    };

    const addExercise = exerciseObj => {
        return fetch("http://localhost:8088/exercises", {
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

    const removeExercise = exerciseId => {
        return fetch(`http://localhost:8088/exercises/${exerciseId}`, {
            method: "DELETE"
        })
        .then(getExercise);
    };

    // Subcomponent that renders a subset of itself called a Provider
    // Provider = Interface that other components can use in order to gain access
    // to what the provider holds.
    return (
        <ExerciseContext.Provider value={{exercises, getExercise, getExerciseById, addExercise, updateExercise, removeExercise}}>
            {props.children}
        </ExerciseContext.Provider>
    );
};