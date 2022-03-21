import React, { Component } from 'react';

export default class OneMovieGraphQL extends Component{

  state = { movie: {}, isLoaded: false, error: null }

  componentDidMount(){
    const payload = `
       {
        movie(id: ${this.props.match.params.id}) {
          id
          title
          runtime
          year
          description
          release_date
          rating
          mpaa_rating
        }
      }
    `
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      body: payload,
      headers: myHeaders,
    }

    fetch("http://localhost:4000/v1/graphql", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        movie: data.data.movie,
        isLoaded: true,
      })
    })
  }

  render(){
    const { movie, isLoaded, error } = this.state;

    if (movie.genres){
      movie.genres = Object.values(movie.genres);
    }else{
      movie.genres = [];
    }

    if (error) {
      return <div>error: {error.message}</div>
    }

    if(!isLoaded){
      return <p>Loading...</p>
    }else{
      return(
        <>
          <h2>Movie: {movie.title} ({movie.year}) </h2>

          {movie.poster !== "" &&(
            <div>
              <img src={`https://image.tmdb.org/t/p/w200/${movie.poster}`} alt="poster" />
            </div>
          )}

          <div className="float-start">
            <small>rating: {movie.mpaa_rating}</small>
          </div>
          <div className="float-end">
            {movie.genres.map((m, index) => (
              <span className="badge bg-secondary me-1" key={index}>
                {m}
              </span>
            ))}
          </div>

          <div className="clearfix"></div>
          <hr />

          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td><strong>Title:</strong></td>
                <td>{movie.title}</td>
              </tr>
              <tr>
                <td><strong>Description:</strong></td>
                <td>{movie.description}</td>
              </tr>
              <tr>
                <td><strong>Run Time:</strong></td>
                <td>{movie.runtime} minutes </td>
              </tr>
            </tbody>
          </table>
        </>
      );
    }
  }

}