require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes  = require('./routes/workouts')
const templateRoutes = require('./routes/workoutTemplates')
const bodyMetricRoutes = require('./routes/bodyMetrics')
const goalRoutes = require('./routes/goals')
const socialRoutes = require('./routes/social')
const userRoutes =require('./routes/user')
// express app
const app = express()


// middleware
app.use(express.json()) //to access to the database through the middleware
app.use((req, res, next) => { //The code you provided is a custom middleware function in an Express.js application. This middleware logs information about the incoming request, such as the request path and method, and then calls the next() function to move on to the next middleware in the stack or route handle
  console.log(req.path, req.method)
  next()
})
//By including this middleware, you are essentially creating a logging mechanism that prints information about each incoming request to the console. It's a common practice to include such logging middleware for development and debugging purposes to track the flow of requests through the application

// routes
app.use('/api/workouts', workoutRoutes) //the path you should to check it or change it in postman app ,"mean you can add to your local host that api" 
app.use('/api/templates', templateRoutes)
app.use('/api/body-metrics', bodyMetricRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/user', userRoutes) 

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

 
