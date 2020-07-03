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
const game = io.of('/game')

//Store the room ids mapping to the room property object 
//The room property object looks like this {roomid:str, players:Array(2)}
const rooms = new Map()

const makeRoom = new Promise((resolve) =>{
    let newRoom = randRoom()
    while (rooms.has(newRoom)){
        newRoom = randRoom()
    }
    resolve(newRoom)
})

io.on('connection', socket =>{
    console.log('normal connection')
    socket.on('newGame', (data) => {
        makeRoom.then((room) => {
            socket.emit('newGameCreated', room)
        })
    })
    socket.on('disconnect',()=> (console.log('noo')))
    io.of('/game').on('connection', ()=>console.log('something'))
        
})

game.on('connection', socket =>{
    console.log('Starting a new game')
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))