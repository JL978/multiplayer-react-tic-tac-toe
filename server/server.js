//utilities
const randRoom = require('./utils')

//set up express server
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)
const io = socketio(server)



io.on('connection', socket =>{
    
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))