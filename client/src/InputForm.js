import React from 'react';
import Input from './Input.js'

const InputForm = (props) => {
    const {newGame} = props
    console.log(newGame)
    if (newGame){
        return (
            <form className="input-form">
                <Input 
                name='name'
                placeholder='Your Name...'
                />
            </form>
        );
    }else{
        return (
            <form className="input-form">
                <Input 
                name='name'
                placeholder='Your Name...'
                />
                <Input 
                name='room-id'
                placeholder='Room ID...'
                />
            </form>
        );
    }
    
}

export default InputForm;
