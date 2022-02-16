import React from 'react'; 
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { Home } from './components/Home'
import Movies from './components/Movies'
import { Admin } from './components/Admin'
import OneMovie from './components/OneMovie'
import Genres from './components/Genres'

export default function App() {

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
                  <Link to="/genres">GENRES</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">MANAGE CATALOGUE</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route path="/movies/:id" component={OneMovie} />
              <Route path="/movies">
                <Movies />
              </Route>
              <Route exact path="/genres">
                <Genres />
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

function Movie() {
  let { id } = useParams();
  return <h2>Movie id {id}</h2>
}
