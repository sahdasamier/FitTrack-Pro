require('dotenv').config()

const express = require('express')
const workoutRoutes  = require('./routes/workouts')

// express app
const app = express()


// middleware
app.use(express.json())

app.use((req, res, next) => { //you have to add next to be abe to move to the next peace in the middleware
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/workouts', workoutRoutes) 


 // listen for requests
 app.listen(process.env.PORT, () => { //that mean it depends on the port in the env file
   console.log('listening on port', process.env.PORT)
 })
