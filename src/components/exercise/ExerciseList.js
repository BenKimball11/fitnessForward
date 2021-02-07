import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseContext } from "./ExerciseProvider";

export const ExerciseList = () => {

  const { exercise, getExercise } = useContext(ExerciseContext)


  useEffect(() => {
    getExercise()
  }, [])

  const history = useHistory()



  return (
    <section className="exercises">
      <button className="backBtn" onClick={() => history.goBack()}>Back</button>

      {console.log("ExerciseList:Render", exercise)}
      <h2>Exercise</h2>
      <button className='addExerciseBtn' onClick={() => { history.push("/exercises/create") }}>
        Add New Exercise
          </button>
      <div className="exerciseCards">
        {
          exercise.map(e => {
            return <ExerciseCard key={e.id} exercises={e} />
          })
        }

      </div>
    </section>

  )

}