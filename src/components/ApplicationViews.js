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
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the workout list when http://localhost:3000/workouts */}
        <WorkoutProvider>        

            <ExerciseProvider>
                    
                        <Route exact path="/workouts">
                            <WorkoutList />
                        </Route> 
{/*You put :workoutId(\d+) at the end of the URL to serve as a variable to hold the actual value that will be in the URL.
 For example, if the URL is http://localhost:3000/workouts/detail/3, the value of 3 will be stored in that variable named workoutId. 
The variable can then be accessed and used inside AnimalWorkout. */}
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
                <Route exact path="/exercises/create/:workoutId(\d+)">
                        <ExerciseForm />
                    </Route>
                <Route exact path="/exercises/detail/:exerciseId(\d+)">
                    <ExerciseDetail />
                </Route>
                <Route path="/exercises/edit/:exerciseId(\d+)">
                    <ExerciseForm />
                </Route>

            </ExerciseProvider>
                
        </WorkoutProvider>

        
        </>
    )
}