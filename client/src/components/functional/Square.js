import React from 'react';
import Icon from './icons'

const Square = (props) => {
  return (
    <div className="square" onClick={props.onClick.bind(this, props.id)}>
      <Icon {...props}/> 
    </div>
  );
}

export default Square;



