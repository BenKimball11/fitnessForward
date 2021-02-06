import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
// createContext() makes an object with properties
export const WorkoutContext = createContext();

// This component establishes what data can be used.
export const WorkoutProvider = (props) => {
    const [workouts, setWorkouts] = useState([])
    const user = localStorage.getItem("fitnessforward_user")

    const getWorkouts = () => {
        return fetch("http://localhost:8088/workouts?_embed=exercises")
        .then(res => res.json())
        .then(setWorkouts);
    };

    const getWorkoutById = (id) => {
        return fetch(`http://localhost:8088/workouts/${id}?_embed=exercises`)
            .then(res => res.json());
    };

    const addWorkout = workoutObj => {
        return fetch("http://localhost:8088/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workoutObj)
        })
        .then(getWorkouts);
    };

    const updateWorkout = workout => {
        return fetch(`http://localhost:8088/workouts/${workout.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workout)
        })
          .then(getWorkouts);
      };

    const removeWorkout = workoutId => {
        return fetch(`http://localhost:8088/workouts/${workoutId}`, {
            method: "DELETE"
        })
        .then(getWorkouts);
    };

    // Subcomponent that renders a subset of itself called a Provider
    // Provider = Interface that other components can use in order to gain access
    // to what the provider holds.
    return (
        <WorkoutContext.Provider value={{workouts, getWorkouts, getWorkoutById, addWorkout, updateWorkout, removeWorkout}}>
            {props.children}
        </WorkoutContext.Provider>
    );
};