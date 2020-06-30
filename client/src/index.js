import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import Start from './Start'

ReactDOM.render(
  <React.StrictMode>
    <>
      <Start />
      <Board />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);


