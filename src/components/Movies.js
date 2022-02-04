import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Movies extends Component {

  state = { movies: [] };

  componentDidMount() {
    this.setState({
      movies:[
        {id: 1, title: "load of the ring 1", runtime: 154},
        {id: 2, title: "load of the ring 2", runtime: 149},
        {id: 3, title: "load of the ring 3", runtime: 161}
      ]
    })
  };

  render() {
    return(
      <>
        <h2>choose a movie! </h2>

        <ul>
          {this.state.movies.map((m) => (
            <li key={m.id}>
              <Link to={`movies/${m.id}`}>{m.title}</Link>              
            </li>
          ))}
        </ul>
      </>
    );
  }  
}
