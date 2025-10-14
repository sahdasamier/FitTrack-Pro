import { useEffect, useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import WorkoutStats from '../components/WorkoutStats'
import SearchFilter from '../components/SearchFilter'
import Toast from '../components/Toast'
import { API_BASE_URL } from '../config/api'

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => { 
      setIsLoading(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts`)
        const json = await response.json()

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: Array.isArray(json) ? json : [] })
        } else {
          console.error('Failed to fetch workouts:', response.status, json)
          dispatch({ type: 'SET_WORKOUTS', payload: [] })
        }
      } catch (error) {
        console.error('Network error fetching workouts:', error)
        dispatch({ type: 'SET_WORKOUTS', payload: [] })
      }
      setIsLoading(false)
    }

    fetchWorkouts()
  }, [dispatch]) 

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleWorkoutAdded = (message) => {
    showToast(message || 'Workout added successfully!', 'success')
  }

  const handleWorkoutDeleted = (message) => {
    showToast(message || 'Workout deleted successfully!', 'success')
  }

  const handleWorkoutEdited = (message) => {
    showToast(message || 'Workout updated successfully!', 'success')
  }

  // Filter and sort workouts
  const getFilteredAndSortedWorkouts = () => {
    if (!workouts || !Array.isArray(workouts)) return []

    let filtered = workouts.filter(workout =>
      workout.title && workout.title.toLowerCase().includes((searchTerm || '').toLowerCase())
    )

    switch(sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      case 'load-high':
        return filtered.sort((a, b) => b.load - a.load)
      case 'load-low':
        return filtered.sort((a, b) => a.load - b.load)
      case 'reps-high':
        return filtered.sort((a, b) => b.reps - a.reps)
      case 'reps-low':
        return filtered.sort((a, b) => a.reps - b.reps)
      default:
        return filtered
    }
  }

  const displayedWorkouts = getFilteredAndSortedWorkouts()

  return(
    <div className="home">
      <div className="workouts">
        <div className="workouts-header">
          <h2>My Workouts</h2>
          <p>Track your fitness journey and monitor your progress</p>
        </div>

        <WorkoutStats />

        {workouts && workouts.length > 0 && (
          <SearchFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading workouts...</p>
          </div>
        ) : displayedWorkouts.length > 0 ? (
          <div className="workouts-list">
            {displayedWorkouts.map((workout) => (
              <WorkoutDetails 
                key={workout._id} 
                workout={workout}
                onDelete={handleWorkoutDeleted}
                onEdit={handleWorkoutEdited}
              />
            ))}
          </div>
        ) : workouts && workouts.length > 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No workouts found</h3>
            <p>Try adjusting your search term</p>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🏋️</div>
            <h3>No workouts yet</h3>
            <p>Start by adding your first workout using the form on the right</p>
          </div>
        )}
      </div>
      <WorkoutForm onSuccess={handleWorkoutAdded} />
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default Home