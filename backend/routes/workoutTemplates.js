const express = require('express')
const { getTemplates, getTemplate, createTemplate, updateTemplate, deleteTemplate } = require('../controllers/workoutTemplateController')

const router = express.Router()

router.get('/', getTemplates)
router.get('/:id', getTemplate)
router.post('/', createTemplate)
router.patch('/:id', updateTemplate)
router.delete('/:id', deleteTemplate)

module.exports = router


