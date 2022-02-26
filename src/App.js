import React, { Component } from 'react'; 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home'
import Movies from './components/Movies'
import Admin from './components/Admin'
import OneMovie from './components/OneMovie'
import Genres from './components/Genres'
import OneGenre from './components/OneGenre'
import AddEditMovie from './components/AddEditMovie'

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      jwt: "",
    }
    this.handleJWTChange(this.handleJWTChange.bind(this));
  }

  handleJWTChange = (jwt) => {
    this.setState({jwt: jwt});
  }

  logout = () =>{
    this.setState({jwt: ""});
  }

  render(){

    let loginLink;
    if (this.state.jwt === ""){
      loginLink = <Link to="/login">login</Link>
    }else{
      loginLink = <Link to="/logout" onClick={this.logout}>logout</Link>
    }

    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-3">
                Go Watch Movies 
              </h1>
            </div>
            <div className="col mt-3 text-end">
              {loginLink}
            </div>
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
                    <Link to="/admin/movie/0">ADD MOVIE</Link>
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
                <Route path="/genres/:id" component={OneGenre} />
                <Route exact path="/genres">
                  <Genres />
                </Route>
                <Route path ="/admin/movie/:id" component={AddEditMovie} />
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
}
