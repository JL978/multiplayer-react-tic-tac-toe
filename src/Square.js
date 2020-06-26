import React, {Component} from 'react'

const firstX = {
    background: 'black',
    width: '90%',
    height: '90%',
    position: 'absolute',
    borderRadius: '50%',
    // transform: 'rotate(45deg)'
}

const secondX = {
    background: 'white',
    width: '70%',
    height: '70%',
    position: 'absolute',
    borderRadius: '50%',
    // transform: 'rotate(-45deg)'
}

class Square extends Component {
    constructor(props){
      super(props)
      this.state = {}
    }
  
    render(){
      return(
        <div className="square">
            <div className="first" style={firstX}></div>
            <div className="last" style={secondX}></div>
        </div>
      )
    }
  }
  
  
  export default Square;