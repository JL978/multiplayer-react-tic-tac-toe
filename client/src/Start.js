import React from 'react';
import Choice from './Choice.js'
import InputForm from './InputForm.js'
import Loading from './Loading'

import {Redirect} from 'react-router-dom'

import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:4000'

class Start extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            name: '',
            newGame: null,
            room: '',
            loading: false,
            serverConfirmed: false
        }
    }
    
    componentDidMount(){
        this.socket = socketIOClient(ENDPOINT)
        this.socket.on('newGameCreated', (room) =>{
            console.log(room)
            this.setState({serverConfirmed:true, room:room})
        })
        this.socket.on('joinConfirmed', ()=>{
            this.setState({serverConfirmed:true})
        })
    }


    componentWillUnmount(){
        this.socket.disconnect()
    }

    onChoice = (choice)=>{
        const gameChoice = choice==='new'?true:false
        const newState = {newGame: gameChoice}
        this.setState(newState, ()=>{
            this.stepForward()
        })
    }

    validate = ()=>{
        if (this.state.newGame){
            return !(this.state.name==='')
        }else{
            return !(this.state.name==='') && !(this.state.room==='')
        }
    }

    onSubmit = ()=>{
        this.setState({loading: true})
        if (this.validate()){
            if (this.state.newGame){
                this.socket.emit('newGame', {name:this.state.name})
            }else{
                this.socket.emit('joining', {name:this.state.name, room:this.state.room})
            }
        }else{
            setTimeout(()=>this.setState({loading: false }), 500)
        }
    }

    stepBack = ()=>{
        this.setState({step: this.state.step - 1})
    }

    stepForward = () =>{
        this.setState({step: this.state.step + 1})
    }

    onTyping = (e)=>{
        const target = e.target.name
        const newState = {[target]:e.target.value}
        this.setState(newState)
    }

    render(){
        if (this.state.serverConfirmed){
            return(
                <Redirect to={`/game?room=${this.state.room}&name=${this.state.name}`} />
            )
        }else{
            switch(this.state.step){
                case(1):
                    return (
                        <Choice onChoice={this.onChoice}/>
                    );
                case(2):
                    return (
                        <>
                            <Loading loading={this.state.loading}/>
                            <InputForm 
                                stepBack={this.stepBack} 
                                onSubmit={this.onSubmit} 
                                onTyping={this.onTyping.bind(this)}
                                newGame={this.state.newGame}
                                name = {this.state.name}
                                room = {this.state.room}/> 
                        </>
                    );
                default:
                    return null
            }
        }
        
    }
    
}

export default Start;

