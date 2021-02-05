import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"

import { WorkoutProvider } from "./workout/WorkoutProvider"
import { WorkoutList } from "./workout/WorkoutList"
import { WorkoutForm } from "./workout/WorkoutForm"
import { WorkoutDetail } from "./workout/WorkoutDetail"

import { ExerciseProvider } from "./exercise/ExerciseProvider"
import { ExerciseList } from "./exercise/ExerciseList"
import { ExerciseForm } from "./exercise/ExerciseForm"
import { ExerciseDetail } from "./exercise/ExerciseDetail"
 
export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <WorkoutProvider>        

                <ExerciseProvider>
                    
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
                    
           
                <Route exact path="/exercises">
                    <ExerciseList />
                </Route>
                <Route exact path="/exercises/detail/:exerciseId(\d+)">
                    <ExerciseDetail />
                </Route>
                <Route path="/exercises/edit/:exerciseId(\d+)">
                    <ExerciseForm />
                </Route>

                <Route exact path="/exercises/create">
                        <ExerciseForm />
                    </Route>
            </ExerciseProvider>
                
        </WorkoutProvider>

        
        </>
    )
}