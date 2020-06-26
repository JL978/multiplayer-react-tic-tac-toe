import React, { Component } from 'react';

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Board />
    );
  }
}

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <Square />
    )
  }
}



