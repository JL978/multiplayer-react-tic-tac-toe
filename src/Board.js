import React, { Component } from 'react';
import Square from './Square';


class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: new Array(9).fill(null),
      player: 'X',
      end: false
    }
    this.switch = new Map([['X', 'O'], ['O', 'X']])
    this.winStates = [
      [0, 1, 2], [3, 4, 5],[6, 7, 8],
      [0, 3, 6], [1, 4, 7],[2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
  }


  handleClick = (index) => {
    const {game, player, end} = this.state
    if (!game[index] && !end){
      const newState = [...game]
      newState.splice(index, 1, player)
      this.setState({game: newState}, () =>{
        if (this.checkWinner(player, this.state.game)){
          console.log(`${player} wins`)
          this.setState({end: true})
        }else if(this.checkDraw(this.state.game)){
          console.log(`draw`)
          this.setState({end: true})
        }
      })
      this.setState({player: this.switch.get(player)})
    }
  }

  checkWinner(player, game){
    return this.winStates.some(state =>(
      state.every((position => game[position] === player))
    ))
  }

  checkDraw(board){
    return board.every(value => value !== null)
  }

  renderSquare(i){
    return(
      <Square key={i} value={this.state.game[i]} id={i} onClick={this.handleClick}/> 
    )
  }

  render(){
    const squareArray = []
    for (let i=0; i<9; i++){
      const newSquare = this.renderSquare(i)
      squareArray.push(newSquare)
    }
    return(
      <div className="board">
        {squareArray}
      </div>)
  }
}


export default Board



