import React from 'react'

export default function PlayAgain({gameDone}) {
    return (
        <div className='again-container'>
            <button className='again-button' style={{visibility: gameDone?'visible':'hidden', opacity: gameDone?'1':'0'}}>Play Again</button>
        </div>
    )
}
