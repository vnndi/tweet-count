import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Friends from './pages/Friends';
import NoMatch from './pages/NoMatch';
import NavBar from './components/NavBar';

const App = () =>
    <Router>
        <div>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/friends" component={Friends} />
            <Route component={NoMatch} />
        </Switch>
        </div>
    </Router>;

export default App;