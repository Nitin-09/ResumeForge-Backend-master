const connectToMongo =require('./db')
const express = require('express')
const serverless = require('serverless-http')
const cors=require('cors')
connectToMongo();

const app = express()
const port = 5000

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/.netlify/functions/api/auth',require('../routes/auth'))
app.use('/.netlify/functions/api/resume',require('../routes/resume'))
app.use('/.netlify/functions/api/tempelates',require('../routes/tempelates'))


app.listen(port, () => {
  console.log(`Backend of Resume builder listening on port ${port}`)
})
module.exports = app
module.exports.handler = serverless(app)