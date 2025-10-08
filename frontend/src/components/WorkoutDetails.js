import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout, onDelete, onEdit }) => {
    const { dispatch } = useWorkoutsContext()
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(workout.title)
    const [editLoad, setEditLoad] = useState(workout.load)
    const [editReps, setEditReps] = useState(workout.reps)
    
    const handleDelete = async() => {
        const response = await fetch('/api/workouts/'+ workout._id, {
            method:'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
            if (onDelete) onDelete('Workout deleted successfully!')
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault()
        
        const updatedWorkout = {
            title: editTitle,
            load: editLoad,
            reps: editReps
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedWorkout)
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
            setIsEditing(false)
            if (onEdit) onEdit('Workout updated successfully!')
        }
    }

    const handleCancel = () => {
        setEditTitle(workout.title)
        setEditLoad(workout.load)
        setEditReps(workout.reps)
        setIsEditing(false)
    }

    // Calculate total volume
    const totalVolume = workout.load * workout.reps
    
    if (isEditing) {
        return (
            <div className="workout-details editing">
                <form onSubmit={handleUpdate} className="edit-form">
                    <h4>✏️ Edit Workout</h4>
                    
                    <label>Exercise Title:</label>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                    />

                    <div className="edit-inline-inputs">
                        <div className="edit-input-group">
                            <label>Load (kg):</label>
                            <input
                                type="number"
                                value={editLoad}
                                onChange={(e) => setEditLoad(e.target.value)}
                                required
                            />
                        </div>
                        <div className="edit-input-group">
                            <label>Reps:</label>
                            <input
                                type="number"
                                value={editReps}
                                onChange={(e) => setEditReps(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="edit-actions">
                        <button type="submit" className="btn-save">
                            💾 Save
                        </button>
                        <button type="button" onClick={handleCancel} className="btn-cancel">
                            ✕ Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
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
                <div className="stat-item stat-volume">
                    <span className="stat-label">📊 Volume</span>
                    <span className="stat-value">{totalVolume} kg</span>
                </div>
            </div>
            
            <p className="timestamp">
                {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
            </p>
            
            <div className="workout-actions">
                <span className="material-symbols-outlined edit-btn" onClick={() => setIsEditing(true)}>
                    edit
                </span>
                <span className="material-symbols-outlined delete-btn" onClick={handleDelete}>
                    delete
                </span>
            </div>
        </div>
    ) 
}

export default WorkoutDetails; 