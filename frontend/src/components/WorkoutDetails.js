import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
//date fns i should install package through that command"npm install date-fns"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const {dispatch} =useWorkoutsContext()
    const handleClick = async()=>{
        const response = await fetch('/api/workouts/'+ workout._id, {
            method:'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
        }
    }
   return(
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p> <strong>Load(kg): </strong> {workout.load}</p>
        <p> <strong>Reps: </strong> {workout.load}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> 
        {/* The second argument is an options object that includes { addSuffix: true }. This option is used to add a suffix such as "ago" or "from now" to the formatted distance. */}
            {/* //that is automatic time stamp that mongodb added for us    */}
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span> 
        {/* // i just add the link in html.index folder and then i call it here  */}
    </div>
    
   ) 
}

export default WorkoutDetails; 