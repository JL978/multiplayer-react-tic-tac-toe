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
      game: null,
      piece: 'X',
      end: false,
      waiting: false,
      room: '',
      joinError: false,
      currentPlayer: null,
      opponentPlayer: []
    }
    //Auxilary data to help with game logic
    this.switch = new Map([['X', 'O'], ['O', 'X']])
    this.winStates = [
      [0, 1, 2], [3, 4, 5],[6, 7, 8],
      [0, 3, 6], [1, 4, 7],[2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
  }

  componentDidMount() {
    this.socket = io(ENDPOINT)
    const {room, name} = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
     })
    this.setState({room})
    this.socket.emit('newRoomJoin', {room, name})
    this.socket.on('waiting', ()=> this.setState({waiting:true}))
    this.socket.on('starting', ()=> this.setState({waiting:false}))
    this.socket.on('joinError', () => this.setState({joinError: true}))
    this.socket.on('pieceAssignment', (piece) => this.setState({piece: piece}))
  }

  handleClick = (index) => {
    const {game, player, end} = this.state
    if (!game[index] && !end){
      //Making a new copy of the game state to make changes
      const newState = [...game]
      newState.splice(index, 1, player)
      //Setting the new game state - using a callback function 
      //to get the new state immediately as React update state asynchronously
      //and does not guarantee changes right after setState
      this.setState({game: newState}, () =>{
        //Check for if the player that just went won the game
        //Check for if the game is filled but no one won yet (draw)
        //Used this.state.game here instead of the game variable above 
        //because we want to get the newest game state
        if (this.checkWinner(player, this.state.game)){
          this.setState({end: true})
        }else if(this.checkDraw(this.state.game)){
          this.setState({end: true})
        }
      })
      //Only set new player after game state was checked so we check
      //the right player at the given time
      this.setState({player: this.switch.get(player)})
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
      <Square key={i} value={this.state.game[i]} player={this.state.player} end={this.state.end} id={i} onClick={this.handleClick}/> 
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
          <Status message='Your Turn'/>
          <div className="board">
            {squareArray}
          </div>
          <ScoreBoard data={{player1:['Jimmy', 1], player2:['Joyce', 2]}}/>
          <PlayAgain end={this.state.end}/>
        </>
      )
    }
  }
}


export default Board



