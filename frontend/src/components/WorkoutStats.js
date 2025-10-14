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

  // Duration stats (if present)
  const durations = workouts
    .map(w => {
      if (typeof w.durationMinutes === 'number') return w.durationMinutes
      if (w.startTime && w.endTime) {
        const start = new Date(w.startTime).getTime()
        const end = new Date(w.endTime).getTime()
        if (!isNaN(start) && !isNaN(end) && end > start) {
          return (end - start) / 60000
        }
      }
      return null
    })
    .filter(v => typeof v === 'number')

  const totalDuration = durations.reduce((a, b) => a + b, 0)
  const avgDuration = durations.length ? (totalDuration / durations.length) : 0

  // Simple Epley 1RM estimate per exercise title
  const titleToBestOneRm = new Map()
  workouts.forEach(w => {
    const title = w.title || 'Unknown'
    const load = Number(w.load)
    const reps = Number(w.reps)
    if (!load || !reps) return
    const epley = load * (1 + reps / 30)
    const prev = titleToBestOneRm.get(title) || 0
    if (epley > prev) titleToBestOneRm.set(title, epley)
  })
  // pick three common lifts if present
  const trackedLifts = ['Bench Press', 'Squat', 'Deadlift']
  const oneRmStats = trackedLifts.map(name => ({ name, value: titleToBestOneRm.get(name) || 0 }))

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

        <Tooltip text="Average workout duration (minutes)" position="bottom">
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-number">{avgDuration.toFixed(1)}</div>
              <div className="stat-text">Avg Duration (min)</div>
            </div>
          </div>
        </Tooltip>

        {oneRmStats.map(item => (
          <Tooltip key={item.name} text={`Estimated 1RM for ${item.name} (Epley)`} position="bottom">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <div className="stat-number">{item.value ? item.value.toFixed(1) : '--'}</div>
                <div className="stat-text">{item.name} 1RM (kg)</div>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default WorkoutStats

