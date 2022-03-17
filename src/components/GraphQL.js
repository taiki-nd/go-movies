  import React, { Component } from 'react';
  import { Link } from 'react-router-dom';
  
  export default class GraphQL extends Component {

    constructor(props){
      super(props);
      this.state = {
        movies: [],
        isLoaded: false,
        error: null,
        alert:{
          type: "d-none",
          message: ""
        },
      } 
    }

    componentDidMount() {
      const payload = `
        {
          list {
            id
            title
            runtime
            year
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

    fetch("http://localhost:4000/v1/graphql/list", requestOptions)
      .then(response => response.json())
      .then(data => {
        let thelist = Object.values(data.data.list);
        return thelist
      })
      .then(thelist => {
        console.log(thelist);
        this.setState({
          movies: thelist
        })
      })
    }
    

    render(){
      let {movies} = this.state
      return (
        <>
          <h2>GraphQL</h2>
          <hr />
          <div className="list-group">
            {movies.map((m) => (
              <Link key={m.id} to={`/movies/${m.id}`} className="list-group-item list-group-item-action">{m.title}</Link>
            ))}
          </div>
        </>
      )
    }
  }