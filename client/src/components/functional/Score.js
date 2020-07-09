import React from 'react'

export default function Score({name, score}) {
    return (
        <div className='score-container'>
            <h1 className='name'>{name}</h1>
            <h1 className='score'>{score}</h1>
        </div>
    )
}
