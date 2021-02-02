import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
// createContext() makes an object with properties
export const WorkoutExerciseContext = createContext();

// This component establishes what data can be used.
export const WorkoutExerciseProvider = (props) => {
    const [workoutExercises, setWorkoutExercise] = useState([])

    const getWorkoutExercise = () => {
        return fetch("http://localhost:8088/exercises?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setWorkoutExercise);
    };

    const getWorkoutExerciseById = (id) => {
        return fetch(`http://localhost:8088/exercises/${id}?_embed=employees&_embed=animals`)
            .then(res => res.json());
    };

    const addWorkoutExercise = workoutExerciseObj => {
        return fetch("http://localhost:8088/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workoutExerciseObj)
        })
        .then(getWorkoutExercise);
    };

    const updateWorkoutExercise = workoutExercise => {
        return fetch(`http://localhost:8088/exercises/${workoutExercise.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workoutExercise)
        })
          .then(getWorkoutExercise);
      };

    const removeWorkoutExercise = exercisesId => {
        return fetch(`http://localhost:8088/exercises/${exercisesId}`, {
            method: "DELETE"
        })
        .then(getWorkoutExercise);
    };

    // Subcomponent that renders a subset of itself called a Provider
    // Provider = Interface that other components can use in order to gain access
    // to what the provider holds.
    return (
        <WorkoutExerciseContext.Provider value={{workoutExercises, getWorkoutExercise, getWorkoutExerciseById, addWorkoutExercise, updateWorkoutExercise, removeWorkoutExercise}}>
            {props.children}
        </WorkoutExerciseContext.Provider>
    );
};