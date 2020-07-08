//utilities
const randRoom = require('./utils')

//set up express server
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const Player = require('./player')
const Board = require('./board')

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
}

function checkRoomFull(room){
    console.log(rooms.get(room).players.length)
    return rooms.get(room).players.length 
}

function randPiece(){
    return Math.random > 0.5 ? 'X':'O'
}

function pieceAssignment(room){
    const firstPiece = randPiece()
    const lastPiece = firstPiece === 'X'? 'O':'X'
    console.log(firstPiece, lastPiece)

    currentRoom = rooms.get(room)
    currentRoom.players[0].piece = firstPiece
    currentRoom.players[1].piece = lastPiece
}


function newGame(room){
    currentRoom = rooms.get(room)
    const board = new Board
    currentRoom = {...currentRoom, board:board}
}

io.on('connection', socket =>{
    //On the client submit event to create a new room
    socket.on('newGame', () => {
        makeRoom.then((room) => {
            socket.emit('newGameCreated', room)
        }).catch(error => console.log(error))
    })

    //On the client submit event to join a room
    socket.on('joining', ({room}) => {
        if (rooms.has(room)){
            socket.emit('joinConfirmed')
        }else{
            socket.emit('errorMessage', 'No room with that id found')
        }
    })

    socket.on('newRoomJoin', ({room,name})=>{
        socket.join(room)
        const id = socket.id
        const newPlayer = new Player(name, room, id)
        joinRoom(newPlayer, room)
        const peopleInRoom = checkRoomFull(room)
        if (peopleInRoom===1){
            io.to(room).emit('waiting')
        }
        if (peopleInRoom===2){
            pieceAssignment(room)
            currentPlayers = rooms.get(room).players
            for (const player of players){
                io.to(player.id).emit('pieceAssignment', player.piece)
            }
            newGame(room)
            io.to(room).emit('starting')
        } 
        if (peopleInRoom===3){
            socket.leave(room)
            kick(room)
            socket.emit('joinError', 'Game is in session')
        }
    })

    

    //TODO: on disconnect - gotta delete player from player list, reset score if anyone
    //is still in the room and emit waiting to the room, or delete room if no one is left. 
    socket.on('disconnect',()=> (console.log('player disconnected')))        
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))