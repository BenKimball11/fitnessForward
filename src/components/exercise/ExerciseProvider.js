import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
// createContext() makes an object with properties
export const ExerciseContext = createContext();

// This component establishes what data can be used.
export const ExerciseProvider = (props) => {
    const [exercises, setExercise] = useState([])

    const getExercise = () => {
        return fetch("http://localhost:8088/exercises?_embed=workouts")
        .then(res => res.json())
        .then(setExercise);
    };

    const getExerciseById = (id) => {
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

    const removeExercise = exercisesId => {
        return fetch(`http://localhost:8088/exercises/${exercisesId}`, {
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

/* import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const ExerciseContext = createContext()

// This component establishes what data can be used.
export const ExerciseProvider = (props) => {
    const [exercises, setExercises] = useState([])

    const getExercises = () => {
        return fetch("http://localhost:8088/exercises?_expand=workout")
        .then(res => res.json())
        .then(setExercises)
    }

    const addExercise = exerciseObj => {
        return fetch("http://localhost:8088/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseObj)
        })
        .then(getExercises)
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    
    return (
        <ExerciseContext.Provider value={{
            exercises, getExercises, addExercise
        }}>
            {props.children}
        </ExerciseContext.Provider>
    )
} */