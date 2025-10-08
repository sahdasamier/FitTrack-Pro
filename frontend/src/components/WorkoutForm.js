import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import Tooltip from './Tooltip'

const WorkoutForm = ({ onSuccess }) => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [gender, setGender] = useState('male')
  const [exerciseType, setExerciseType] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // Automatically set image based on gender and exercise type
  const handleExerciseTypeChange = (type) => {
    setExerciseType(type)
    if (type && type !== 'custom' && type !== 'other') {
      const imagePath = `/images/exercises/${type}-${gender}.jpg`
      setImageUrl(imagePath)
    } else if (type === 'other') {
      setImageUrl('')
    }
  }

  const handleGenderChange = (newGender) => {
    setGender(newGender)
    if (exerciseType && exerciseType !== 'custom' && exerciseType !== 'other') {
      const imagePath = `/images/exercises/${exerciseType}-${newGender}.jpg`
      setImageUrl(imagePath)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const workout = { title, reps, load, imageUrl, gender, exerciseType }
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {  
        "content-type": "application/json"
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setImageUrl('')
      setExerciseType('')
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
      if (onSuccess) onSuccess('Workout added successfully!')
    }
  }
  
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>I am:</label>
      <div className="gender-selection">
        <button
          type="button"
          className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
          onClick={() => handleGenderChange('male')}
        >
          👨 Male
        </button>
        <button
          type="button"
          className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
          onClick={() => handleGenderChange('female')}
        >
          👩 Female
        </button>
      </div>
      
      <label>Exercise Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        placeholder="e.g., Bench Press, Squats, Deadlifts"
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Weight (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        placeholder="e.g., 80"
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Repetitions:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
        placeholder="e.g., 12"
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <label>Exercise Type:</label>
      <select 
        value={exerciseType}
        onChange={(e) => handleExerciseTypeChange(e.target.value)}
        className="image-select"
      >
        <option value="">Select Exercise Type</option>
        <option value="chest">💪 Chest</option>
        <option value="legs">🦵 Legs</option>
        <option value="back">🏋️ Back</option>
        <option value="shoulders">💪 Shoulders</option>
        <option value="arms">💪 Arms</option>
        <option value="core">🔥 Core</option>
        <option value="other">⚪ Other (No Image)</option>
      </select>

      {exerciseType && exerciseType !== 'other' && (
        <>
          <label>Exercise Image:</label>
          <div className="image-options">
            <label className="image-option-item">
              <input
                type="radio"
                name="imageSource"
                value="default"
                checked={imageUrl.includes('/images/exercises/')}
                onChange={() => {
                  const imagePath = `/images/exercises/${exerciseType}-${gender}.jpg`
                  setImageUrl(imagePath)
                }}
              />
              <span>📸 Use Default Image</span>
            </label>
            
            <label className="image-option-item">
              <input
                type="radio"
                name="imageSource"
                value="url"
                checked={imageUrl && !imageUrl.includes('/images/exercises/')}
                onChange={() => setImageUrl('https://')}
              />
              <span>🌐 Paste Image URL</span>
            </label>
          </div>

          {imageUrl && !imageUrl.includes('/images/exercises/') && (
            <>
              <label>Image URL:</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="https://example.com/your-image.jpg"
                className="custom-url-input"
              />
              <div className="image-help">
                <small>💡 Paste any image URL from the web (e.g., from Unsplash, Google Images)</small>
              </div>
            </>
          )}

          {imageUrl && (
            <div className="image-preview">
              <small>Preview:</small>
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="form-image-preview"
                onError={(e) => {
                  e.target.style.display = 'block'
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3EImage not found 📷%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          )}
        </>
      )}

      <Tooltip text="Add this workout to your log" position="top">
        <button>Add workout</button>
      </Tooltip>
      {error && 
        <div className="error">{error}</div>
      }
    </form>
  )
}

export default WorkoutForm