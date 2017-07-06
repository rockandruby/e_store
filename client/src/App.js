import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import Routes from './Routes'

class App extends Component {

  render() {
    return (
      <Router>
          <div>
            <ul className="nav nav-tabs">
              <li role="presentation"><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
            <Routes />
          </div>
      </Router>
    );
  }
}

export default App;
