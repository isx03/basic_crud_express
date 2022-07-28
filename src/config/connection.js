const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: false
})

connection.connect( error =>{
  if( error ){
    console.log(error)
  }
  console.log("database connected")
})

module.exports = connection

