import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutStats = () => {
  const { workouts } = useWorkoutsContext()

  if (!workouts || workouts.length === 0) {
    return null
  }

  // Calculate statistics
  const totalWorkouts = workouts.length
  const totalVolume = workouts.reduce((acc, workout) => {
    return acc + (workout.load * workout.reps)
  }, 0)
  const avgLoad = workouts.reduce((acc, workout) => acc + workout.load, 0) / totalWorkouts
  const avgReps = workouts.reduce((acc, workout) => acc + workout.reps, 0) / totalWorkouts

  return (
    <div className="stats-dashboard">
      <h3 className="stats-title">📊 Your Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-content">
            <div className="stat-number">{totalWorkouts}</div>
            <div className="stat-text">Total Workouts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{totalVolume.toLocaleString()}</div>
            <div className="stat-text">Total Volume (kg)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏋️</div>
          <div className="stat-content">
            <div className="stat-number">{avgLoad.toFixed(1)}</div>
            <div className="stat-text">Avg Load (kg)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-number">{avgReps.toFixed(1)}</div>
            <div className="stat-text">Avg Reps</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutStats

