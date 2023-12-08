import { useEffect, useState } from "react"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home =() => {
 const [workouts,setWorkouts] = useState(null)

  useEffect (() => {
    const fetchWorkouts = async () => { 
    const response = await fetch ('/api/workouts') // we add proxy to package frontend and remove the path there from here and start from after that path ,by this way i solve the issue in fetching date from backend which in another port  
    const json = await response.json()

    if (response.ok) {
        setWorkouts(json)
      }
    }

    fetchWorkouts()
  }, [])

   return(
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) =>(
       <WorkoutDetails key={workout._id} workout={workout} />

))}
      </div>
      <WorkoutForm />
    </div>
   )
}

export default Home