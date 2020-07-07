//utilities
const randRoom = require('./utils')

//set up express server
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const Player = require('./player')

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)
const io = socketio(server)


//Store the room ids mapping to the room property object 
//The room property object looks like this {roomid:str, players:Array(2)}
const rooms = new Map()

const makeRoom = new Promise((resolve, reject) =>{
    try{
        let newRoom = randRoom()
        while (rooms.has(newRoom)){
            newRoom = randRoom()
        }
        rooms.set(newRoom, {roomId: newRoom, players:[]})
        resolve(newRoom)
    }catch(error){
        reject(error)
    }
})

const joinRoom = (player, room) => {
    currentRoom = rooms.get(room)
    updatedPlayerList = currentRoom.players.push(player)
    updatedRoom = {...currentRoom, players:updatedPlayerList}
}

function kick(room){
    currentRoom = rooms.get(room)
    currentRoom.players.pop()
    console.log(rooms)
}

function checkRoomFull(room){
    console.log(rooms.get(room).players.length)
    return rooms.get(room).players.length 
}

function pieceAssignment(){
    return Math.random > 0.5 ? 'X':'O'
}


io.on('connection', socket =>{
    socket.emit('newSession', socket.id)

    //On the client submit event to create a new room
    socket.on('newGame', () => {
        makeRoom.then((room) => {
            socket.emit('newGameCreated', room)
        }).catch(error => console.log(error))
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
        const newPlayer = new Player(name, room, id)
        joinRoom(newPlayer, room)
        switch(checkRoomFull(room)){
            case 2:
                io.to(room).emit('starting')
                break
            case 3:
                socket.leave(room)
                kick(room)
                socket.emit('joinError', 'Game is in session')
                break
            default:
                io.to(room).emit('waiting')
        }
    })

    socket.on('disconnect',()=> (console.log('player disconnected')))        
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))