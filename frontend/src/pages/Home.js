import { useEffect } from "react"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => { 
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch]) 

  return(
    <div className="home">
      <div className="workouts">
        <div className="workouts-header">
          <h2>My Workouts</h2>
          <p>Track your fitness journey and monitor your progress</p>
        </div>
        
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🏋️</div>
            <h3>No workouts yet</h3>
            <p>Start by adding your first workout using the form on the right</p>
          </div>
        )}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home