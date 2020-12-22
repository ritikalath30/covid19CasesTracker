import React from 'react';

import {Route, Switch} from 'react-router-dom';

import App from './App'; 
import Error from './Error';
import Quarantine from './pages/Quarantine';
import Treatment from './pages/Treatment';
import Rules from './pages/Rules'

import India from './India';

function Main() {
  return (
    <div className="App">
   
        <Switch>
          <Route path='/' exact component={App} />
          <Route path='/India' component={India} />
          <Route path='/quarantine' exact component={Quarantine} />
              <Route path='/rules' exact component={Rules} />
              <Route path='/treatment' exact component={Treatment} />

          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default Main;
