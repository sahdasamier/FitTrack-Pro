const  Mongoose  = require('mongoose')
const Workout =require('../models/workoutModel')

//get all workouts
const getWorkouts = async(req,res)=>{
  const workouts = await Workout.find({}).sort({createAt: -1})
res.status(200).json(workouts)

}

//get single workout

const getWorkout = async(req,res)=>{
 const {id} = req.params

if(!Mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error:'No such workout'})
}
 const workout = await Workout.findById(id)
 if(!workout){
  return res.status(400).json({ error:'No such workout' })
}
  res.status(200).json(workout)
}

//create a new workout
const createWorkout = async(req,res)=>{
    const {title ,load, reps} =req.body //this schema in the modules which user should add to the date base 
    
    //add doc to db
    try{
      const workout = await Workout.create({title, load, reps}) //now we storing Workout.create() this in workout
      res.status(200).json(workout)

    }catch(error){
      res.status(400).json({mssg:"error in posting work"})
    }
}

//delete a workout
const deleteWorkout = async (req,res)=>{
  const { id }=req.params;
  try{
    const workout = await Workout.deleteOne({title,load,reps})
    res.status(200).json(workout)
  }catch(error){
    res.status(400).json({msg:"Error deleting workout"})
  }

}

//update a workout


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout
}