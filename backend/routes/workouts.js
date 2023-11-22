const express = require('express')
const Workout = require('../models/workoutModel')
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
router.post('/',async(req,res) => {
    const {title ,load, reps} =req.body //this schema in the modules which user should add to the date base 
    
    try{
      const workout = await Workout.create({title, load, reps}) //now we storing Workout.create() this in workout
      res.status(200).json(workout)

    }catch(error){
        res.status(400).json({mssg:"error in posting work"})
    }
})
router.delete('/:id',(req,res) => {
    res.json({mssg:"delete a single workout "})
 })
 router.patch('/:id',(req,res) => {
    res.json({mssg:"update a single workout "})
 })
module.exports = router 