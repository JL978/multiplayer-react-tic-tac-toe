import React from 'react';

const Input = (props) => {
    const {name, placeholder, value, onChange} = props
    return (
        <input autoComplete='off' type="text" name={name} id={name} placeholder={placeholder} value={value} onChange={onChange}/>
    );
}

export default Input;
