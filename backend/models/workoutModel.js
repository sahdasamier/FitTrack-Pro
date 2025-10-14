const mongoose =require('mongoose') //that allow for us to create modules and schemas ,cuz mongodb alone  is schema-less 
const Schema = mongoose.Schema

//we want our date be in this schema and all of them is required , if the date not look like that or missing any object, it will not be allowed ,and the type of date ,user must add according to it 
const setSchema = new Schema({
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
    performedAt: { type: Date, required: false }
  }, { _id: false })

const workoutSchema = new Schema({
    title:{
        type:String,
        required:true,  
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    // optional structured sets for advanced tracking
    sets: {
        type: [setSchema],
        required: false,
        default: []
    },
    imageUrl:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        enum:['male', 'female'],
        required:false
    },
    exerciseType:{
        type:String,
        enum:['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'other'],
        required:false
    },
    // timing fields for duration calculations
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
    durationMinutes: { type: Number, required: false },
    // free-form notes
    notes: { type: String, required: false }
},{timestamps:true }) //when we create new doc , it will automatically create that props and update that prosperity as well and said it created   

module.exports = mongoose.model("Workout",workoutSchema)

