import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()
    
    const handleClick = async() => {
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
            
            <div className="workout-stats">
                <div className="stat-item">
                    <span className="stat-label">💪 Load</span>
                    <span className="stat-value">{workout.load} kg</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">🔄 Reps</span>
                    <span className="stat-value">{workout.reps}</span>
                </div>
            </div>
            
            <p className="timestamp">
                {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
            </p>
            
            <span className="material-symbols-outlined delete-btn" onClick={handleClick}>
                delete
            </span>
        </div>
    ) 
}

export default WorkoutDetails; 