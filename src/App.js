import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/home.component';

const HatsPage = () => (
  <div><h1>Coming Hats Page</h1></div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component ={HomePage}></Route>
        <Route path='/hats' component ={HatsPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
