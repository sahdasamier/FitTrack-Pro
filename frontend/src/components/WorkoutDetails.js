import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Tooltip from './Tooltip'

const WorkoutDetails = ({ workout, onDelete, onEdit }) => {
    const { dispatch } = useWorkoutsContext()
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(workout.title)
    const [editLoad, setEditLoad] = useState(workout.load)
    const [editReps, setEditReps] = useState(workout.reps)
    const [editImageUrl, setEditImageUrl] = useState(workout.imageUrl || '')
    
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
            reps: editReps,
            imageUrl: editImageUrl
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
        setEditImageUrl(workout.imageUrl || '')
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
                            <label>Weight (kg):</label>
                            <input
                                type="number"
                                value={editLoad}
                                onChange={(e) => setEditLoad(e.target.value)}
                                required
                            />
                        </div>
                        <div className="edit-input-group">
                            <label>Repetitions:</label>
                            <input
                                type="number"
                                value={editReps}
                                onChange={(e) => setEditReps(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <label>Exercise Image URL (optional):</label>
                    <input
                        type="url"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />

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
            {workout.imageUrl && (
                <div className="workout-image-container">
                    <img 
                        src={workout.imageUrl} 
                        alt={workout.title}
                        className="workout-image"
                        onError={(e) => {
                            e.target.style.display = 'none'
                        }}
                    />
                </div>
            )}
            <h4>{workout.title}</h4>
            
            <div className="workout-stats">
                <Tooltip text="Weight lifted in this exercise" position="top">
                    <div className="stat-item">
                        <span className="stat-label">⚡ Weight</span>
                        <span className="stat-value">{workout.load} kg</span>
                    </div>
                </Tooltip>
                <Tooltip text="Number of times you repeated the exercise" position="top">
                    <div className="stat-item">
                        <span className="stat-label">🔁 Repetitions</span>
                        <span className="stat-value">{workout.reps}</span>
                    </div>
                </Tooltip>
                <Tooltip text="Total weight moved (Weight × Repetitions)" position="top">
                    <div className="stat-item stat-volume">
                        <span className="stat-label">📊 Total Volume</span>
                        <span className="stat-value">{totalVolume} kg</span>
                    </div>
                </Tooltip>
            </div>
            
            <p className="timestamp">
                {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
            </p>
            
            <div className="workout-actions">
                <Tooltip text="Edit this workout" position="bottom">
                    <span className="material-symbols-outlined edit-btn" onClick={() => setIsEditing(true)}>
                        edit
                    </span>
                </Tooltip>
                <Tooltip text="Delete this workout" position="bottom">
                    <span className="material-symbols-outlined delete-btn" onClick={handleDelete}>
                        delete
                    </span>
                </Tooltip>
            </div>
        </div>
    ) 
}

export default WorkoutDetails; 