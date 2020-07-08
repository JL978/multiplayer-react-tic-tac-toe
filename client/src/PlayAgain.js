import React from 'react'

export default function PlayAgain({end}) {
    return (
        <div className='again-container'>
            <button className='again-button' style={{visibility: end?'visible':'hidden', opacity: gameDone?'1':'0'}}>Play Again</button>
        </div>
    )
}
