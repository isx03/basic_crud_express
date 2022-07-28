const bodyParser = require('body-parser')
const express = require('express')
const { StatusCodes } = require('http-status-codes')
const UserRouters = require('./routers/UserRouters')

const port = process.env.APP_PORT
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/users', UserRouters)

app.use((err, _req, res, _next) => {
  let errorObj = {}

  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR
  errorObj.error = 'Process not done, try again later'

  if( process.env.APP_ENV != 'production' ){
    errorObj.error = err.message
    errorObj.stack = err.stack
  }

  res.status(status).json(errorObj)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})