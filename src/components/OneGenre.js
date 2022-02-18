import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OneGenre extends Component{

  state = {
    movies: [],
    isLoaded: false,
    error: null,
  }
  componentDidMount() {
    fetch("http://localhost:4000/v1/genres/" + this.props.match.params.id)
    //.then(response => response.json())
    .then(response => {
      console.log("status code is", response.status)
      if (response.status !== 200){
        let err = Error;
        err.message = "Invalid status code: " + response.status;
        this.setState({error: err});
      }
      return response.json()
    })
    .then(json => {
      this.setState({
        movies: json.movies,
        isLoaded: true,
      },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
    })
  };

  render() {
    const { movies, isLoaded, error } = this.state

    if (!movies){
      movies = [];
    }

    if (error) {
      return <div>error: {error.message}</div>
    }

    if(!isLoaded){
      return <p>Loading...</p>
    }else{
      return(
        <>
          <h2>Genre: {}</h2>

          <div className="list-group">
            {movies.map((m) => (
              <Link to={`/movies/${m.id}`} className="list-group-item list-group-item-action">{m.title}</Link>
            ))}
          </div>
        </>
      )
    }
  }
}