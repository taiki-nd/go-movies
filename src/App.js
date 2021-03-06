import React, { Component } from 'react'; 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home'
import Movies from './components/Movies'
import Admin from './components/Admin'
import OneMovie from './components/OneMovie'
import Genres from './components/Genres'
import OneGenre from './components/OneGenre'
import AddEditMovie from './components/AddEditMovie'
import Login from './components/Login'
import GraphQL from './components/GraphQL';
import OneMovieGraphQL from './components/OneMovieGraphQL';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      jwt: "",
    }
    this.handleJWTChange(this.handleJWTChange.bind(this));
  }

  componentDidMount(){
    let t = window.localStorage.getItem("jwt")
    if (t) {
      if(this.state.jwt === ""){
        this.setState({
          jwt: JSON.parse(t)
        })
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({jwt: jwt});
  }

  logout = () =>{
    this.setState({jwt: ""});
    window.localStorage.removeItem("jwt")
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
                  {this.state.jwt !== "" && (
                    <>
                      <li className="list-group-item">
                        <Link to="/admin/movie/0">ADD MOVIE</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/admin">MANAGE CATALOGUE</Link>
                      </li>
                    </>
                  )}
                  <li className="list-group-item">
                    <Link to="/graphql">GraphQL</Link>
                  </li>

                </ul>
              </nav>
            </div>

            <div className="col-md-10">
              <Switch>
                <Route path="/movies/:id" component={OneMovie} />
                <Route path="/movies-graphql/:id" component={OneMovieGraphQL} />
                <Route path="/movies">
                  <Movies />
                </Route>
                <Route path="/genres/:id" component={OneGenre} />
                <Route exact path="/genres">
                  <Genres />
                </Route>
                <Route path="/graphql">
                  <GraphQL />
                </Route>
                <Route exact path="/login" component={(props) => <Login {...props} handleJWTChange={this.handleJWTChange} />} />
                <Route path ="/admin/movie/:id" component={(props) => <AddEditMovie {...props} jwt={this.state.jwt}/>} />
                <Route path="/admin" component={(props) => <Admin {...props} jwt={this.state.jwt}/>} />
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
            
          </div>
          <div className="mt-3">
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        </div>
      </Router>
    );
  }
}
