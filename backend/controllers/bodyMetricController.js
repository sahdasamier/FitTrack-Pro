const BodyMetric = require('../models/bodyMetricModel')
const mongoose = require('mongoose')

const getMetrics = async (req, res) => {
  const metrics = await BodyMetric.find({}).sort({ date: -1 })
  res.status(200).json(metrics)
}

const getMetric = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such metric' })
  const metric = await BodyMetric.findById(id)
  if (!metric) return res.status(404).json({ error: 'No such metric' })
  res.status(200).json(metric)
}

const createMetric = async (req, res) => {
  try {
    const metric = await BodyMetric.create(req.body)
    res.status(200).json(metric)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

const updateMetric = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'No such metric' })
  const metric = await BodyMetric.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
  if (!metric) return res.status(400).json({ error: 'No such metric' })
  res.status(200).json(metric)
}

const deleteMetric = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'No such metric' })
  const metric = await BodyMetric.findOneAndDelete({ _id: id })
  if (!metric) return res.status(400).json({ error: 'No such metric' })
  res.status(200).json(metric)
}

module.exports = { getMetrics, getMetric, createMetric, updateMetric, deleteMetric }


