const express = require('express')
const { getGoals, getGoal, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

const router = express.Router()

router.get('/', getGoals)
router.get('/:id', getGoal)
router.post('/', createGoal)
router.patch('/:id', updateGoal)
router.delete('/:id', deleteGoal)

module.exports = router


