const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goalSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  targetDate: { type: Date, required: false },
  // Examples: deadlift 100kg x5, workout 4 times/week
  type: { type: String, enum: ['lift', 'frequency', 'duration', 'weight'], required: true },
  exerciseTitle: { type: String, required: false },
  targetReps: { type: Number, required: false },
  targetLoad: { type: Number, required: false },
  targetPerWeek: { type: Number, required: false },
  accomplished: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Goal', goalSchema)


