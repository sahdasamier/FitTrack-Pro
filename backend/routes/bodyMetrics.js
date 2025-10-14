const express = require('express')
const { getMetrics, getMetric, createMetric, updateMetric, deleteMetric } = require('../controllers/bodyMetricController')

const router = express.Router()

router.get('/', getMetrics)
router.get('/:id', getMetric)
router.post('/', createMetric)
router.patch('/:id', updateMetric)
router.delete('/:id', deleteMetric)

module.exports = router


