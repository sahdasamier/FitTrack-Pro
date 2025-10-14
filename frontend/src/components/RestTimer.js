import { useEffect, useState } from 'react'

const RestTimer = ({ initialSeconds = 90, onComplete }) => {
  const [remaining, setRemaining] = useState(initialSeconds)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(id)
          setActive(false)
          if (onComplete) onComplete()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [active, onComplete])

  const start = () => {
    setRemaining(initialSeconds)
    setActive(true)
  }

  const stop = () => setActive(false)
  const reset = () => setRemaining(initialSeconds)

  return (
    <div className="rest-timer">
      <div className="timer-display">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</div>
      <div className="timer-actions">
        <button type="button" onClick={start}>Start</button>
        <button type="button" onClick={stop}>Pause</button>
        <button type="button" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default RestTimer


