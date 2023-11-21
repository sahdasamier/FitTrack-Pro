require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes  = require('./routes/workouts')

// express app
const app = express()


// middleware
app.use(express.json()) //to access to the database through the middleware

app.use((req, res, next) => { //you have to add next to be abe to move to the next peace in the middleware
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/workouts', workoutRoutes) //the path you should to check it or change it in post man 

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
   // listen for requests
 app.listen(process.env.PORT, () => { //that mean it depends on the port in the env file
  console.log('listening on port', process.env.PORT)
})
  })
  .catch((err) => {
    console.log(err)
  }) 

 
