const mongoose = require('mongoose')
const Schema = mongoose.Schema

const templateExerciseSchema = new Schema({
  title: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  load: { type: Number, required: false }
}, { _id: false })

const workoutTemplateSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  schedule: { type: String, required: false }, // e.g., PPL, 5x5
  exercises: { type: [templateExerciseSchema], required: true },
}, { timestamps: true })

module.exports = mongoose.model('WorkoutTemplate', workoutTemplateSchema)


