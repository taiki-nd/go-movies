import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Genres extends Component{

  state = {
    genres: [],
    isLoaded: false,
    error: null,
  }

  componentDidMount(){
    fetch("http://localhost:4000/v1/genres")
    .then(response => {
      console.log("status code is ", response.status)
      if (response.status !== 200){
        let err = Error;
        err.message = "Invalid status code: " + response.status
        this.setState({error: err});
      }
      return response.json()
    })
    .then(json => {
      this.setState({
        genres: json.genres,
        isLoaded: true,
      },
        error => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
    })
  }

  render() {
    const { genres, isLoaded, error } = this.state;

    if (error) {
      return <div>error: {error.message}</div>
    }

    if(!isLoaded){
      return <p>Loading...</p>
    }else{
      return(
        <>
          <h2>Genres</h2>
          <div className="list-group">
            {genres.map((g) => (
              <Link
                key={g.id} 
                to={{
                  pathname: `/genres/${g.id}`,
                  genreName: g.genre_name,
                }}
                className="list-group-item list-group-item-action">
                  {g.genre_name}
              </Link>
            ))}
          </div>
        </>
      )
    }
  }
}