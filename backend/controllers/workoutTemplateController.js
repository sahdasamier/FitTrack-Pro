const WorkoutTemplate = require('../models/workoutTemplateModel')
const mongoose = require('mongoose')

const getTemplates = async (req, res) => {
  const templates = await WorkoutTemplate.find({}).sort({ createdAt: -1 })
  res.status(200).json(templates)
}

const getTemplate = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such template' })
  }
  const template = await WorkoutTemplate.findById(id)
  if (!template) return res.status(404).json({ error: 'No such template' })
  res.status(200).json(template)
}

const createTemplate = async (req, res) => {
  try {
    const template = await WorkoutTemplate.create(req.body)
    res.status(200).json(template)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

const updateTemplate = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such template' })
  }
  const template = await WorkoutTemplate.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
  if (!template) return res.status(400).json({ error: 'No such template' })
  res.status(200).json(template)
}

const deleteTemplate = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such template' })
  }
  const template = await WorkoutTemplate.findOneAndDelete({ _id: id })
  if (!template) return res.status(400).json({ error: 'No such template' })
  res.status(200).json(template)
}

module.exports = { getTemplates, getTemplate, createTemplate, updateTemplate, deleteTemplate }


