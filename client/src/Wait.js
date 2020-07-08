import React, {useRef} from 'react';

const Wait = ({room, display}) => {
    const textArea = useRef(null)
    const onClick = () =>{
        textArea.current.select()
        document.execCommand('copy')
    }

    return (
        <div className='wait' style={{display:display?'flex':'none'}}>
            <h1 className="wait-message">Waiting for player to connect...</h1>
            <div className="copy">
                <h1 className='copy-message'>Give your friend the following room id to connect</h1>
                <div className='copy-container'>
                    <input ref={textArea} readOnly={true} value={room} className='copy-area'/>
                    <button className='copy-button' onClick={onClick}>Copy</button>
                </div>
            </div>
        </div>
    );
}

export default Wait;
