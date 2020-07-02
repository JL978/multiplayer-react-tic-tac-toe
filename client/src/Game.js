import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client"

import Start from './Start';
import Board from './Board'


const ENDPOINT = 'http://127.0.0.1:4000'

const Game = () => {
    const[display, setDisplay] = useState({
        playing: false,
        loading: false,
    })

    useEffect(()=>{
        var socket = socketIOClient(ENDPOINT)
        return ()=> socket.disconnect()
    },[])

    const onSubmit =(validate) =>{
        setDisplay({loading: true})
        if (validate){
            socket.emit('validation', 'hello')
        }else{
            setTimeout(()=>setDisplay(
                { loading: false }
            ), 500)
        }
    }

    if (display.playing){
        return (
            <Board />
        )
    }else{
        return (
            <Start loading={display.loading} onSubmit={onSubmit}/>
        )
    }
    
}

export default Game;
