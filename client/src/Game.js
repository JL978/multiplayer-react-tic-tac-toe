import React, {useState} from 'react';
import Start from './Start';

const Game = () => {
    const[display, setDisplay] = useState({
        playing: false,
        loading: false,
    })

    const onSubmit =(validate) =>{
        setDisplay({loading: true})
        if (validate){
            console.log('hello')
        }else{
            setTimeout(()=>setDisplay(
                { loading: false }
            ), 500)
        }
    }

    if (display.playing){
        return null
    }else{
        return (
            <Start loading={display.loading} onSubmit={onSubmit}/>
        )
    }
    
}

export default Game;
