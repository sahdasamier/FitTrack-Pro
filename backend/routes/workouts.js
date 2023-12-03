const express = require('express')
const Workout = require('../models/workoutModel')
const router =express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout
} = require('../controllers/workoutController')

//to get all workouts
router.get('/',getWorkouts)

//git a single workout 
router.get('/:id',getWorkout)

//post a bew workout 
router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)



module.exports = router 