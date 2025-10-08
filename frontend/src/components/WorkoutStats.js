import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import Tooltip from './Tooltip'

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
        <Tooltip text="Total number of workouts you've logged" position="bottom">
          <div className="stat-card">
            <div className="stat-icon">💪</div>
            <div className="stat-content">
              <div className="stat-number">{totalWorkouts}</div>
              <div className="stat-text">Total Workouts</div>
            </div>
          </div>
        </Tooltip>

        <Tooltip text="Combined weight lifted (Load × Reps) across all workouts" position="bottom">
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-number">{totalVolume.toLocaleString()}</div>
              <div className="stat-text">Total Volume (kg)</div>
            </div>
          </div>
        </Tooltip>

        <Tooltip text="Average weight lifted per workout" position="bottom">
          <div className="stat-card">
            <div className="stat-icon">🏋️</div>
            <div className="stat-content">
              <div className="stat-number">{avgLoad.toFixed(1)}</div>
              <div className="stat-text">Avg Weight (kg)</div>
            </div>
          </div>
        </Tooltip>

        <Tooltip text="Average number of repetitions per workout" position="bottom">
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-number">{avgReps.toFixed(1)}</div>
              <div className="stat-text">Avg Repetitions</div>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default WorkoutStats

