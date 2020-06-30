import React from 'react';
import X from './X'
import O from './O'
const Icon = (props) => {
    switch(props.value){
        case 'X':
            return <X />
        case 'O':
            return <O />
        default:
            return <div></div>
    }
}

export default Icon;
