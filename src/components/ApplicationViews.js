import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"

import { WorkoutProvider } from "./workout/WorkoutProvider"
import { WorkoutList } from "./workout/WorkoutList"
import { WorkoutForm } from "./workout/WorkoutForm"
import { WorkoutDetail } from "./workout/WorkoutDetail"

import { WorkoutExerciseProvider } from "./exercise/WorkoutExerciseProvider"
import { WorkoutExerciseList } from "./exercise/WorkoutExerciseList"
import { WorkoutExerciseForm } from "./exercise/WorkoutExerciseForm"
import { WorkoutExerciseDetail } from "./exercise/WorkoutExerciseDetail"
 
export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <WorkoutProvider>        

                <WorkoutExerciseProvider>
                    
                        <Route exact path="/workouts">
                            <WorkoutList />
                        </Route> 

                        <Route exact path="/workouts/detail/:workoutId(\d+)">
                            <WorkoutDetail />
                        </Route>
                        <Route exact path="/workouts/create">
                    <WorkoutForm />
                        </Route>
                        <Route path="/workouts/edit/:workoutId(\d+)">
                    <WorkoutForm />
                        </Route>
                    
                </WorkoutExerciseProvider>
            </WorkoutProvider>

            {/* Render the animal list when http://localhost:3000/customers */}
            <WorkoutExerciseProvider>  
                <Route path="/workoutExercises">
                    <WorkoutExerciseList />
                </Route>
            </WorkoutExerciseProvider>  

            {/* Render the animal list when http://localhost:3000/locations */}
            <WorkoutExerciseProvider>
                <Route exact path="/workoutExercises">
                    <WorkoutExerciseList />
                </Route>
                <Route exact path="/workoutExercises/detail/:workoutExerciseId(\d+)">
                    <WorkoutExerciseDetail />
                </Route>
                <Route path="/workoutExercises/edit/:workoutExerciseId(\d+)">
                    <WorkoutExerciseForm />
                </Route>

                <Route exact path="/workoutExercises/create">
                        <WorkoutExerciseForm />
                    </Route>
            </WorkoutExerciseProvider>
        </>
    )
}