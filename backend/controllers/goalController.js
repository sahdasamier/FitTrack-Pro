const Goal = require('../models/goalModel')
const mongoose = require('mongoose')

const getGoals = async (req, res) => {
  const goals = await Goal.find({}).sort({ createdAt: -1 })
  res.status(200).json(goals)
}

const getGoal = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such goal' })
  const goal = await Goal.findById(id)
  if (!goal) return res.status(404).json({ error: 'No such goal' })
  res.status(200).json(goal)
}

const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create(req.body)
    res.status(200).json(goal)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

const updateGoal = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'No such goal' })
  const goal = await Goal.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
  if (!goal) return res.status(400).json({ error: 'No such goal' })
  res.status(200).json(goal)
}

const deleteGoal = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'No such goal' })
  const goal = await Goal.findOneAndDelete({ _id: id })
  if (!goal) return res.status(400).json({ error: 'No such goal' })
  res.status(200).json(goal)
}

module.exports = { getGoals, getGoal, createGoal, updateGoal, deleteGoal }


