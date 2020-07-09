import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Start from './components/pages/Start';
import Board from './components/pages/Board'


const Game = () => (
    <Router>
        <Route path='/' exact component={Start} />
        <Route path='/game' component={Board} />
    </Router>
)
 
export default Game