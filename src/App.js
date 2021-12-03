import logo from './logo.svg';
import './App.css';
import Home from './home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './login';
import DemoHome from './demo-home';
import React, { useState } from 'react';
import Report from './report';
import Presentation from './presentation';
import Navbar from './navbar';

function App() {

  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <div className='main'>
        <BrowserRouter>
          <header className="App-header">
            <h2>BTN710 - Demo</h2>
            <Navbar />
          </header>
          <Switch>
            <Route exact path="/btn710-project-website/" render={() => <Home token={token} />} />
            <Route path="/btn710-project-website/demo" render={() => <DemoHome token={token} />} />
            <Route path="/btn710-project-website/report" component={Report} />
            <Route path="/btn710-project-website/presentation" component={Presentation} />
          </Switch>
        </BrowserRouter>
      </div>
      <div className='footer'>&copy; Le Minh Pham</div>
    </div>
  );
}

export default App;