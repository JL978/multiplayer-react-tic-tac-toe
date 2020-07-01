import React from 'react';
import Input from './Input.js'
import ChoiceButton from './ChoiceButton'

const InputForm = (props) => {
    const {newGame} = props
    
    const onBack = ()=>{

    }

    const onSubmit = () =>{

    }
    if (newGame){
        return (
            <div className="input-container">
                <Input 
                name='name'
                placeholder='Your Name...'
                />
                <div className='nav-container'>
                    <ChoiceButton type='nav-back' choice='back' onBack={onBack} label='Back'/>
                    <ChoiceButton type='nav-forward' choice='enter' onSubmit={onSubmit} label="Let's Go!"/>
                </div>
            </div>
        );
    }else{
        return (
            <div className="input-container">
                <Input 
                name='name'
                placeholder='Your Name...'
                />
                <Input 
                name='room-id'
                placeholder='Room ID...'
                />
                <div className='nav-container'>
                    <ChoiceButton type='nav-back' choice='back' onBack={onBack} label='Back'/>
                    <ChoiceButton type='nav-forward' choice='enter' onSubmit={onSubmit} label="Let's Go!"/>
                </div>
            </div>
        );
    }
    
}

export default InputForm;
