const express = require('express')

const router =express.Router()
//to get all workouts
router.get('/',(req,res) => {
    res.json({mssg:"GET all workouts"})
})
//git a single workout 
router.get('/:id',(req,res) => {
   res.json({mssg:"get a single workout "})
})

//post a bew workout 
router.post('/',(req,res) => {
    res.json({mssg:"post a new workout "})

})
router.delete('/:id',(req,res) => {
    res.json({mssg:"delete a single workout "})
 })
 router.patch('/:id',(req,res) => {
    res.json({mssg:"update a single workout "})
 })
module.exports = router 