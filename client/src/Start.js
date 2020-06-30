import React, {useState} from 'react';

const Start = () => {
    const [form, setForm] = useState({ 
        step: 1,
        name: '',
        newGame: false,
        room: null
    })
    return (
        <div className='start-screen'>
            <form>
                <h1>What is your name</h1>
                <input type="text" name="name" id="name" placeholder="Enter Name"/>
            </form>
        </div>
    );
}

export default Start;
