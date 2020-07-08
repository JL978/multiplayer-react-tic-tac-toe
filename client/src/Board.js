import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Square from './Square';
import Wait from './Wait'
import Status from './Status'
import ScoreBoard from './ScoreBoard'
import PlayAgain from './PlayAgain'

import io from 'socket.io-client'
import qs from 'qs'
const ENDPOINT = 'http://127.0.0.1:4000'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: new Array(9).fill(null),
      piece: 'X',
      turn: true,
      end: false,
      room: '',
      currentPlayerScore: 0,
      opponentPlayer: [],
      //State to check for when a new user join
      waiting: false,
      joinError: false
    }
    this.socketID = null
  }

  componentDidMount() {
    //Getting the room and the username information from the url
    //Then emit to back end to process
    this.socket = io(ENDPOINT)
    const {room, name} = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
     })
    this.setState({room})
    this.socket.emit('newRoomJoin', {room, name})

    //New user join, logic decide on backend whether to display 
    //the actual game or the wait screen or redirect back to the main page
    this.socket.on('waiting', ()=> this.setState({waiting:true}))
    this.socket.on('starting', ({gameState, players, turn})=> {
      this.setState({waiting:false})
      this.gameStart(gameState, players, turn)
    })
    this.socket.on('joinError', () => this.setState({joinError: true}))

    //Listening to the assignment of piece and the gameState event to handle
    //each move
    this.socket.on('pieceAssignment', ({piece, id}) => {
      this.setState({piece: piece})
      this.socketID = id 
    })
    this.socket.on('update', ({gameState, turn}) => this.handlePlay(gameState, turn))
  }

  gameStart(gameState, players, turn){
    const opponent = players.filter(([id, name]) => id!==this.socketID)[0][1]
    this.setState({opponentPlayer: [opponent, 0]})
    this.setBoard(gameState)
    this.setTurn(turn)
  }

  handlePlay(gameState, turn){
    this.setBoard(gameState)
    this.setTurn(turn)
  }

  setTurn(turn){
    if (this.state.piece === turn){
      this.setState({turn:true})
    }else{
      this.setState({turn:false})
    }
  } 

  setBoard(gameState){
    this.setState({game:gameState})
  }

  handleClick = (index) => {
    const {game, piece, end, turn} = this.state
    if (!game[index] && !end && turn){
      // //Making a new copy of the game state to make changes
      // const newState = [...game]
      // newState.splice(index, 1, piece)
      // //Setting the new game state - using a callback function 
      // //to get the new state immediately as React update state asynchronously
      // //and does not guarantee changes right after setState
      // this.setState({game: newState}, () =>{
      //   //Check for if the player that just went won the game
      //   //Check for if the game is filled but no one won yet (draw)
      //   //Used this.state.game here instead of the game variable above 
      //   //because we want to get the newest game state
      //   if (this.checkWinner(player, this.state.game)){
      //     this.setState({end: true})
      //   }else if(this.checkDraw(this.state.game)){
      //     this.setState({end: true})
      //   }
      // })
      // //Only set new player after game state was checked so we check
      // //the right player at the given time
    }
  }
  //Auxilary check functions
  checkWinner(player, game){
    return this.winStates.some(state =>(
      state.every((position => game[position] === player))
    ))
  }

  checkDraw(game){
    return game.every(value => value !== null)
  }

  renderSquare(i){
    return(
      <Square key={i} value={this.state.game[i]} 
                              player={this.state.piece} 
                              end={this.state.end} 
                              id={i} 
                              onClick={this.handleClick}
                              turn={this.state.turn}/> 
    )
  }

  render(){
    if (this.state.joinError){
      return(
        <Redirect to={`/`} />
      )
    }else{
      const squareArray = []
      for (let i=0; i<9; i++){
        const newSquare = this.renderSquare(i)
        squareArray.push(newSquare)
      }
      return(
        <>
          <Wait display={this.state.waiting} room={this.state.room}/>
          <Status message={this.state.turn?'Your Turn':`${this.state.opponentPlayer[0]}'s Turn`}/>
          <div className="board">
            {squareArray}
          </div>
          <ScoreBoard data={{player1:['You', this.state.currentPlayerScore], player2:[this.state.opponentPlayer[0], this.state.opponentPlayer[1]]}}/>
          <PlayAgain end={this.state.end}/>
        </>
      )
    }
  }
}


export default Board



