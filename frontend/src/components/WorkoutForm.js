import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import Tooltip from './Tooltip'
import RestTimer from './RestTimer'
import { useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

const WorkoutForm = ({ onSuccess }) => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [gender, setGender] = useState('male')
  const [exerciseType, setExerciseType] = useState('')
  const [error, setError] = useState(null)
  const [recentTitles, setRecentTitles] = useState([])
  const [lastSet, setLastSet] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])
  const [exerciseList, setExerciseList] = useState([])
  const [showAdvisor, setShowAdvisor] = useState(false)
  const [advisorExp, setAdvisorExp] = useState('beginner')
  const [advisorBodyWeight, setAdvisorBodyWeight] = useState('')
  const [advisorReps, setAdvisorReps] = useState('8')
  const [isExerciseDropdownOpen, setIsExerciseDropdownOpen] = useState(false)
  const [exerciseQuery, setExerciseQuery] = useState('')
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/exercises.json')
        if (res.ok) {
          const data = await res.json()
          setExerciseList(data)
        }
      } catch (_) {}
    }
    load()
  }, [])

  const onSelectExercise = (name) => {
    setTitle(name)
    const manifestItem = exerciseList.find(e => e.name === name)
    if (manifestItem) {
      // auto-set type based on manifest
      if (manifestItem.type) setExerciseType(prev => prev || manifestItem.type)
      const file = gender === 'female' ? manifestItem.female : manifestItem.male
      if (file) {
        const cleanFile = file.trim()
        setImageUrl(`/images/exercises/${encodeURIComponent(cleanFile)}`)
        return
      }
    }
    setImageUrl(resolveImageFor(name, gender))
    setIsExerciseDropdownOpen(false)
    setExerciseQuery('')
  }

  const normalizeName = (name) => (name || '').trim().replace(/\s+/g, ' ')
  const withPublicUrl = (p) => `${p}`

  const resolveImageFor = (exerciseTitle, forGender) => {
    if (!exerciseTitle) return ''
    const titleNorm = normalizeName(exerciseTitle).toLowerCase()
    const item = exerciseList.find(e => normalizeName(e.name).toLowerCase() === titleNorm)
    const genderFile = item ? (forGender === 'female' ? item.female : item.male) : null
    if (genderFile) {
      const cleanFile = (genderFile || '').trim()
      return `/images/exercises/${encodeURIComponent(cleanFile)}`
    }
    const suffix = forGender === 'female' ? 'Woman' : 'Man'
    const base = normalizeName(exerciseTitle)
    // Try a few filename variants to accommodate stray spaces
    const candidates = [
      `${base} (${suffix}).png`,
      `${base} (${suffix} ).png`,
      ` ${base} (${suffix}).png`
    ]
    return `/images/exercises/${encodeURIComponent(candidates[0])}`
  }

  // Automatically set image based on gender and exercise type
  const handleExerciseTypeChange = (type) => {
    setExerciseType(type)
    if (type === 'other') {
      setImageUrl('')
    } else {
      const path = resolveImageFor(title, gender)
      setImageUrl(path)
    }
  }

  const handleGenderChange = (newGender) => {
    setGender(newGender)
    const path = resolveImageFor(title, newGender)
    setImageUrl(path)
  }

  const classifyExercise = (name) => {
    const n = (name || '').toLowerCase()
    const big = ['squat', 'deadlift', 'bench', 'overhead press', 'ohp', 'row', 'pulldown', 'lunge']
    return big.some(k => n.includes(k)) ? 'compound' : 'isolation'
  }

  const estimateStartingLoad = () => {
    const bw = parseFloat(advisorBodyWeight)
    const reps = parseInt(advisorReps || '8', 10)
    if (!bw || !Number.isFinite(bw)) return null
    const type = classifyExercise(title)
    const exp = advisorExp
    const isFemale = gender === 'female'
    // very rough baseline multipliers of bodyweight for 8 reps (not medical advice)
    const base = {
      compound: { beginner: 0.4, intermediate: 0.7, advanced: 1.0 },
      isolation: { beginner: 0.1, intermediate: 0.2, advanced: 0.3 }
    }
    let multiplier = base[type][exp]
    // female baseline slightly lower at start; adjust by 0.85
    if (isFemale) multiplier *= 0.85
    // adjust for reps away from 8 using simple RIR-ish scaling
    const repAdj = 1 + (reps - 8) * 0.03
    const est = Math.max(2.5, Math.round(bw * multiplier * repAdj / 2.5) * 2.5)
    return est
  }

  const recommendReps = () => {
    const type = classifyExercise(title)
    const exp = advisorExp
    // Simple heuristic ranges
    if (type === 'compound') {
      if (exp === 'beginner') return 8
      if (exp === 'intermediate') return 6
      return 5
    } else {
      if (exp === 'beginner') return 12
      if (exp === 'intermediate') return 10
      return 8
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const workout = { title, reps, load, imageUrl, gender, exerciseType }
    const response = await fetch(`${API_BASE_URL}/api/workouts`, {
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
      setRecentTitles((prev) => Array.from(new Set([title, ...prev])).slice(0, 10))
      setLastSet({ title, load, reps })
      setTitle('')
      setLoad('')
      setReps('')
      setImageUrl('')
      setExerciseType('')
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
      if (onSuccess) onSuccess('Workout added successfully!')
      setShowTimer(true)
    }
  }
  
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Exercise Type:</label>
      <select 
        value={exerciseType}
        onChange={(e) => handleExerciseTypeChange(e.target.value)}
        className="image-select"
      >
        <option value="">All types</option>
        <option value="chest">💪 Chest</option>
        <option value="legs">🦵 Legs</option>
        <option value="back">🏋️ Back</option>
        <option value="shoulders">💪 Shoulders</option>
        <option value="arms">💪 Arms</option>
        <option value="core">🔥 Core</option>
        <option value="other">⚪ Other (No Image)</option>
      </select>

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
      <small className="field-help">Search or pick from the list. Choosing from the list auto-fills the image.</small>
      <div className="exercise-name-input enhanced">
        <div className={`combo ${isExerciseDropdownOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search or select an exercise"
            value={exerciseQuery || title}
            onFocus={() => setIsExerciseDropdownOpen(true)}
            onChange={(e) => {
              setExerciseQuery(e.target.value)
              setTitle(e.target.value)
              setImageUrl(resolveImageFor(e.target.value, gender))
            }}
            className={emptyFields.includes('title') ? 'error' : ''}
          />
          <button type="button" className="dropdown-toggle" onClick={() => setIsExerciseDropdownOpen(o => !o)}>
            ▾
          </button>
          {isExerciseDropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-section">
                <div className="dropdown-header">Popular</div>
                <div className="dropdown-list">
                  {exerciseList
                    .filter(e => !exerciseType || exerciseType === 'other' || e.type === exerciseType)
                    .filter(e => !exerciseQuery || e.name.toLowerCase().includes(exerciseQuery.toLowerCase()))
                    .map(e => (
                      <button key={e.name} type="button" className="dropdown-item" onClick={() => onSelectExercise(e.name)}>
                        <span className="item-name">{e.name}</span>
                        {e.type && <span className={`item-badge type-${e.type}`}>{e.type}</span>}
                      </button>
                    ))}
                  {exerciseList
                    .filter(e => !exerciseType || exerciseType === 'other' || e.type === exerciseType)
                    .filter(e => !exerciseQuery || e.name.toLowerCase().includes(exerciseQuery.toLowerCase())).length === 0 && (
                      <div className="dropdown-empty">
                        <small>No matches. You can use a custom name.</small>
                      </div>
                  )}
                </div>
              </div>
              <div className="dropdown-section">
                <button type="button" className="dropdown-item other" onClick={() => onSelectExercise('__other__')}>+ Use custom name</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {recentTitles.length > 0 && (
        <div className="autocomplete">
          {recentTitles
            .filter(t => t.toLowerCase().includes(title.toLowerCase()) && t !== title)
            .slice(0, 5)
            .map(t => (
              <button key={t} type="button" className="autocomplete-item" onClick={() => setTitle(t)}>{t}</button>
            ))}
        </div>
      )}

      <label>Weight (in kg):</label>
      <div className="weight-with-advice">
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)} 
          value={load}
          placeholder="e.g., 80"
          className={emptyFields.includes('load') ? 'error' : ''}
        />
        <button type="button" className="advice-toggle" onClick={() => setShowAdvisor(s => !s)}>
          {showAdvisor ? 'Hide tips' : 'Get tips'}
        </button>
      </div>

      {showAdvisor && (
        <div className="weight-advisor">
          <div className="advisor-row">
            <label>Experience:</label>
            <select value={advisorExp} onChange={(e) => setAdvisorExp(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="advisor-row">
            <label>Your body weight (kg):</label>
            <input type="number" value={advisorBodyWeight} onChange={(e) => setAdvisorBodyWeight(e.target.value)} placeholder="e.g., 70" />
          </div>
          <div className="advisor-row">
            <label>Target reps:</label>
            <input type="number" value={advisorReps} onChange={(e) => setAdvisorReps(e.target.value)} />
          </div>
          <div className="advisor-row tips">
            <small>
              Tips for {gender === 'female' ? 'women' : 'men'} • {classifyExercise(title) === 'compound' ? 'Compound lift' : 'Isolation move'}
            </small>
            <ul>
              <li>Warm up with 2–3 sets using light weights.</li>
              <li>Pick a weight you can control with perfect form.</li>
              <li>Leave 1–3 reps in reserve; don’t grind the first session.</li>
            </ul>
          </div>
          <div className="advisor-actions">
            <button type="button" onClick={() => {
              const est = estimateStartingLoad();
              if (est) setLoad(String(est))
            }}>Recommend weight</button>
          </div>
        </div>
      )}

      <label>Repetitions:</label>
      <div className="reps-with-advice">
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)} 
          value={reps}
          placeholder="e.g., 12"
          className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <button type="button" className="advice-apply" onClick={() => setReps(String(recommendReps()))}>Use recommended</button>
      </div>

      {lastSet && (
        <div className="last-set-actions">
          <button type="button" onClick={() => { setTitle(lastSet.title); setLoad(lastSet.load); setReps(lastSet.reps) }}>Repeat Last Set</button>
        </div>
      )}

      

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
                  const imagePath = resolveImageFor(title, gender)
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
                  // one-time retry with cleaned filename if we detect encoded trailing space before )
                  try {
                    const url = new URL(e.target.src)
                    const decoded = decodeURIComponent(url.pathname)
                    const cleaned = decoded.replace(/\s+\)\.png$/i, ').png').replace(/^\s+/, '')
                    if (decoded !== cleaned) {
                      const retry = encodeURI(cleaned) // use relative path to avoid wrong origin/port
                      e.target.src = retry
                      return
                    }
                  } catch(_) {}
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
      {showTimer && (
        <div className="rest-timer-container">
          <RestTimer initialSeconds={90} onComplete={() => setShowTimer(false)} />
        </div>
      )}
      {error && 
        <div className="error">{error}</div>
      }
    </form>
  )
}

export default WorkoutForm