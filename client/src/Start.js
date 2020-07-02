import React from 'react';
import Choice from './Choice.js'
import InputForm from './InputForm.js'


class Start extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            name: '',
            newGame: null,
            room: ''
        }
    }
    
    onChoice = (choice)=>{
        const gameChoice = choice==='new'?true:false
        const newState = {newGame: gameChoice}
        this.setState(newState, ()=>{
            this.stepForward()
        })
    }

    stepBack = ()=>{
        this.setState({step: this.state.step - 1})
    }

    stepForward = () =>{
        this.setState({step: this.state.step + 1})
    }

    submit = () =>{
        console.log('hello')
    }

    onTyping = (e)=>{
        const target = e.target.name
        const newState = {[target]:e.target.value}
        this.setState(newState)
    }

    render(){
        switch(this.state.step){
            case(1):
                return (
                    <Choice onChoice={this.onChoice}/>
                );
            case(2):
                return (
                    <InputForm 
                        stepBack={this.stepBack} 
                        onSubmit={this.submit} 
                        onTyping={this.onTyping.bind(this)}
                        newGame={this.state.newGame}
                        name = {this.state.name}
                        room = {this.state.room}/> 
                        
                );
            default:
                return null
        }
    }
    
}

export default Start;
