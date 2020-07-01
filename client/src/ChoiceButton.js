import React from 'react';

const ChoiceButton = ({type, choice, label, onChoice}) => {
    return (
        <div className={`btn btn-${type}`} onClick={onChoice.bind(this, choice)}>{label}</div>
    );
}

export default ChoiceButton;
