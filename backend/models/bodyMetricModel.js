const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bodyMetricSchema = new Schema({
  date: { type: Date, required: true, default: Date.now },
  bodyWeightKg: { type: Number, required: false },
  bodyFatPercent: { type: Number, required: false },
  waistCm: { type: Number, required: false },
  hipsCm: { type: Number, required: false },
  chestCm: { type: Number, required: false },
  bicepCm: { type: Number, required: false },
  thighCm: { type: Number, required: false },
  notes: { type: String, required: false }
}, { timestamps: true })

module.exports = mongoose.model('BodyMetric', bodyMetricSchema)


