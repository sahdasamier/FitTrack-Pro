const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  // add to the database
  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body //{...req.body}: This uses the spread (...) operator to take all the properties from the req.body object. req.body typically contains data sent in the request body, often in a POST or PUT request. This line is updating the document with the values from the request body.
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}