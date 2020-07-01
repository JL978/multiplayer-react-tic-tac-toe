import React from 'react';

const Input = (props) => {
    const {name, placeholder} = props
    return (
        <input autocomplete='off' type="text" name={name} id={name} placeholder={placeholder}/>
    );
}

export default Input;
