import React from 'react'

export default function PlayAgain({end, onClick}) {
    return (
        <div className='again-container'>
            <button className='again-button' onClick={onClick} style={{visibility: end?'visible':'hidden', opacity: end?'1':'0'}}>Play Again</button>
        </div>
    )
}
