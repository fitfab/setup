import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Account from './account';
import Browse from './browse';
import Home from './home';
import Login from './login';

// Update to React v15.5 and as we prepare for React 16
// The Facebook is recommending that we migrate them to JavaScript classes.
// https://facebook.github.io/react/blog/
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="app-wrapper">
                    <Link to={'/'}>
                        <h1>fitfab by Miguel Julio</h1>
                    </Link>
                    <nav >
                        <Link to={'/account'}>
                            Account
                        </Link>
                        <Link to={'/browse'}>
                            Browse
                        </Link>
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </nav>
                    <div className="app-wrapper__content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/account" component={Account} />
                        <Route path="/browse" component={Browse} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>


            </Router>
        );
    }
}
