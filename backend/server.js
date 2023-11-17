require('dotenv').config()

const express = require('express')

// express app
const app = express()

// middleware

app.use((req, res, next) => { //you have to add next to be abe to move to the next peace in the middleware
  console.log(req.path, req.method)
  next()
})

// routes
app.get('/', (req, res) => {
   res.json({mssg: 'Welcome to the app'})
 })
 
 // listen for requests
 app.listen(process.env.PORT, () => {
   console.log('listening on port', process.env.PORT)
 })