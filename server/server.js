//utilities
const randRoom = require('./utils')

//set up express server
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const player = require('./player')

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)
const io = socketio(server)


//Store the room ids mapping to the room property object 
//The room property object looks like this {roomid:str, players:Array(2)}
const rooms = new Map()

const makeRoom = new Promise((resolve) =>{
    let newRoom = randRoom()
    while (rooms.has(newRoom)){
        newRoom = randRoom()
    }
    rooms.set([newRoom, {id: newRoom, players:[]}])
    resolve(newRoom)
})

const joinRoom = (player, room) => {
    currentRoom = rooms[room] 
    rooms[room] = {...currentRoom, players: currentRoom.players.push(player)}
}

function checkRoomFull(room){
    return rooms[room].players.length == 2
}


io.on('connection', socket =>{
    socket.emit('newSession', socket.id)

    //On the client submit event to create a new room
    socket.on('newGame', (data) => {
        makeRoom.then((room) => {
            socket.emit('newGameCreated', room)
        })
    })

    //On the client submit even to join a room
    socket.on('joining', ({room}) => {
        if (rooms.has(room)){
            socket.emit('joinConfirmed')
        }else{
            socket.emit('errorMessage', 'No room with that id found')
        }
    })

    socket.on('newRoomJoin', ({room,name, id})=>{
        socket.join(room)
        const newPlayer = player(name, room, id)
        joinRoom(newPlayer, room)
        if (!checkRoomFull(room)){
            io.to(room).emit('waiting')
        }else{
            io.to(room).emit('starting')
        }
    })

    socket.on('disconnect',()=> (console.log('player disconnected')))        
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))