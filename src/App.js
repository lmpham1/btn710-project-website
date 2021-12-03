import './App.css';
import Home from './home';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './login';
import DemoHome from './demo-home';
import React, { useState } from 'react';
import Report from './report';
import Presentation from './presentation';
import Navbar from './navbar';

function App() {
  const basename = process.env.PUBLIC_URL;
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <div className='main'>
        <HashRouter basename={basename}>
          <header className="App-header">
            <h2>BTN710 - Demo</h2>
            <Navbar basename={basename} />
          </header>
          <Switch>
            <Route exact path="/" render={() => <Home token={token} basename={basename} />} />
            <Route path="/demo" render={() => <DemoHome token={token} />} />
            <Route path="/report" component={Report} />
            <Route path="/presentation" component={Presentation} />
          </Switch>
        </HashRouter>
      </div>
      <div className='footer'>&copy; Le Minh Pham</div>
    </div>
  );
}

export default App;