const express = require('express')
const router = express.Router()

// Stubs for friends and leaderboard
router.get('/friends', (req, res) => {
  res.json({ friends: [] })
})

router.post('/friends', (req, res) => {
  res.json({ ok: true })
})

router.get('/leaderboard/weekly-volume', (req, res) => {
  res.json({ leaderboard: [] })
})

router.get('/streaks', (req, res) => {
  res.json({ streakDays: 0 })
})

module.exports = router


