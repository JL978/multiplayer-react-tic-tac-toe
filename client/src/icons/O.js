import React from 'react';

const beforeStyle ={
    background: 'white',
    width: '90%',
    height: '90%',
    position: 'absolute',
    borderRadius: '50%',
    // transform: 'rotate(45deg)'
}
const afterStyle ={
    background: 'var(--dark-blue)',
    width: '70%',
    height: '70%',
    position: 'absolute',
    borderRadius: '50%',
    // transform: 'rotate(45deg)'
}


const O = () => {
    return (
        <>
            <div className="before" style={beforeStyle}></div>
            <div className = "after" style={afterStyle}></div>
        </>
    );
}

export default O;
