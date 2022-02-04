import React, { Component, Fragment } from 'react'; 
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {


const Home = () => {
  return <h2>HOME</h2>
}

const Movies = () => {
  return <h2>Movies</h2>
}

const Admin = () => {
  return <h2>MANAGE CATALOGUE</h2>
}

  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">
            Go Watch Movies 
          </h1>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">HOME</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">MOVIES</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">MANAGE CATALOGUE</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-2">
            <Switch>
              <Route path="/movies">
                <Movies />
              </Route>
              <Route path="/admin">
                <Admin  />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
          
        </div>
      </div>
    </Router>
  );
}
