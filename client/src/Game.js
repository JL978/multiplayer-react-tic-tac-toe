import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Start from './Start';
import Board from './Board'


const Game = () => (
    <Router>
        <Route path='/' exact component={Start} />
        <Route path='/game' component={Board} />
    </Router>
)
 
export default Game