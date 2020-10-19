import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Repos from './components/Repos';

function App() {
  return (
    <div className='App'>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <NavBar />

      <Switch>
        <Route path='/repos'>
          <Repos />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
