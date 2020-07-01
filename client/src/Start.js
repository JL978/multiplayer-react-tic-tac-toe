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
            room: null
        }
    }
    
    onChoice = (choice)=>{
        const gameChoice = choice==='new'?true:false
        const newState = {...this.state, newGame: gameChoice}
        this.setState(newState, ()=>{
            this.stepForward()
        })
    }

    stepBack = ()=>{
        this.setState({...this.state, step: this.state.step - 1})
    }

    stepForward = () =>{
        this.setState({...this.state, step: this.state.step + 1})
    }
    render(){
        switch(this.state.step){
            case(1):
                return (
                    <Choice onChoice={this.onChoice}/>
                );
            case(2):
                return (
                    <InputForm stepBack={this.stepBack} newGame={this.state.newGame}/> 
                );
            default:
                return null
        }
    }
    
}

export default Start;
