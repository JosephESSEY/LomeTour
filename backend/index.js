const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

app.listen(()=>{
    console.log(`Serveur lancé sur le port : ${process.env.PORT}`)
})