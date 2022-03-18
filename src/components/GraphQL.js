  import React, { Component } from 'react';
  import { Link } from 'react-router-dom';
  import Input from './form-components/Input'
  
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
        searchTerm: "",
      }
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
      let value = e.target.value;
      this.setState(
        prevState => ({
          searchTerm: value,
        })
      )

      this.performSearch(); 
    }

    performSearch() {
      const payload = `
        {
          search(titleContains: "${this.state.searchTerm}") {
            id
            title
            runtime
            year
            description
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
        let thelist = Object.values(data.data.search);
        return thelist
      })
      .then(thelist => {
        console.log(thelist);
        if (thelist.length > 0){
          this.setState({
            movies: thelist
          })
        } else {
          this.setState({
            movies: [],
          })
        }
      })
    }

    componentDidMount() {
      const payload = `
        {
          list {
            id
            title
            runtime
            year
            description
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

          <Input
            title={"search"}
            type={"text"}
            name={"search"}
            value={this.state.searchTerm}
            handleChange={this.handleChange}
          />

          <div className="list-group">
            {movies.map((m) => (
              <>
                <Link key={m.id} to={`/movies-graphql/${m.id}`} className="list-group list-group-item">
                  <strong>{m.title}</strong>
                  <br />
                  <small className="text-muted">
                    ({m.year})-{m.runtime} minutes
                  </small>
                  <br />
                  {m.description.slice(0, 100)}...
                </Link>
                
              </>

            ))}
          </div>
        </>
      )
    }
  }