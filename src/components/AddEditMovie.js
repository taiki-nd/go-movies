import React, { Component } from 'react';
import Input from './form-components/Input'
import TextArea from './form-components/TextArea'
import Select from './form-components/Select'
import Alert from './ui-components/Alert'

export default class AddEditMovie extends Component{

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        rating: "",
        description: "",
      },
      mpaaOptions:[
        /*
        {id: 1, value:"G"},
        {id: 2, value:"PG"},
        {id: 3, value:"PG13"},
        {id: 4, value:"R"},
        {id: 5, value:"NC17"},
        */
        {id: "G", value: "G"},
        {id: "PG", value: "PG"},
        {id: "PG13", value: "PG13"},
        {id: "R", value: "R"},
        {id: "NC17", value: "NC17"},
      ], 
      isLoaded: false,
      error: null,
      errors: [],
      alert: {
        type: "d-none", //className(デフォルトでは表示させない)
        message: "",
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    // client side validation
    let errors = [];
    if (this.state.movie.title === "") {
      errors.push("title");
    }
    this.setState({
      errors: errors
    });
    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());
    console.log(payload)

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    }

    fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.error){
        this.setState({
          alert: {type: "alert-danger", message: data.error.message}
        })
      }else{
        this.setState({
          alert: {type: "alert-success", message: "Changes success!"}
        })
      }
    })
  }

  handleChange = (evt) => {
    let value = evt.target.value
    let name = evt.target.name
    this.setState((prevState) => ({
      movie:{
        ...prevState.movie,
        [name]: value,
      }
    }))

  }

  hasError(key){
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id > 0){
      fetch("http://localhost:4000/v1/movies/" + id)
      .then(response => {
        if (response.status !== 200){
          let err = Error;
          err.message = "Invalid status code:" + response.status
          this.setState({error: err});
        }
        return response.json()
      })
      .then(json => {
        const releaseDate = new Date(json.movie.release_date);//yyyy-mm-ddT00:00:00Zをyyyy-mm-ddにする
        this.setState(
          {
            movie: {
              id: id,
              title: json.movie.title,
              release_date: releaseDate.toISOString().split("T")[0],//yyyy-mm-ddT00:00:00Zをyyyy-mm-ddにする
              runtime: json.movie.runtime,
              mpaa_rating: json.movie.mpaa_rating,
              rating: json.movie.rating,
              description: json.movie.description,
            },
            isLoaded: true,
          },
          error => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      })
    }else{
      this.setState({isLoaded: true})
    }
  }

  render(){

    let { movie, isLoaded, error, alert } = this.state

    if (error) {
      return <div>error: {error.message}</div>
    }

    if(!isLoaded){
      return <p>Loading...</p>
    }else{
      return(
        <>
          <h2>Add/Edit Movie</h2>
          <Alert 
            alertType={alert.type}
            alertMessage={alert.message}
          />
          <hr />
          <form onSubmit={this.handleSubmit}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={movie.id}
              onChange={this.handleChange}
            />
            {/*
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={movie.title}
                onChange={this.handleChange}/>
            </div> 
            */}

            <Input
              title={"Title"}
              type={"text"}
              name={"title"}
              value={movie.title}
              handleChange={this.handleChange}
              className={this.hasError("title") ? "is-invalid" : ""}
              errDiv={this.hasError("title") ? "text-danger" : "d-none"}
              errMessage={"Please enter Title"}
            />
            
            {/*
            <div className="mb-3">
              <label htmlFor="release_date" className="form-label">
                Release Date
              </label>
              <input
                type="text"
                className="form-control"
                id="release_date"
                name="release_date"
                value={movie.release_date}
                onChange={this.handleChange}/>
            </div>
            */}

            <Input
              title={"Release Date"}
              type={"date"}
              name={"release_date"}
              value={movie.release_date}
              handleChange={this.handleChange}
            />

            {/*
            <div className="mb-3">
              <label htmlFor="runtime" className="form-label">
                Runtime
              </label>
              <input
                type="text"
                className="form-control"
                id="runtime"
                name="runtime"
                value={movie.runtime}
                onChange={this.handleChange}/>
            </div>
            */}

            <Input
              title={"Runtime"}
              type={"text"}
              name={"runtime"}
              value={movie.runtime}
              handleChange={this.handleChange}
            />

            {/*
            <div className="mb-3">
              <label htmlFor="mpaa_rating" className="form-label">
                MPAA Rating
              </label>
              <select className="form-select" name="mpaa_rating" value={movie.mpaa_rating} onChange={this.handleChange}>
                <option className="form-select">Chose...</option>
                <option className="form-select" value="G">G</option>
                <option className="form-select" value="MPG">PG</option>
                <option className="form-select" value="PG13">PG13</option>
                <option className="form-select" value="R">R</option>
                <option className="form-select" value="NC17">NC17</option>
              </select>
            </div>
            */}

            <Select 
              title={"MPAA Rating"}
              name={"mpaa_rating"}
              value={movie.mpaa_rating}
              handleChange={this.handleChange}
              placeholder={"Chose..."}
              options={this.state.mpaaOptions}
            />

            {/*
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="text"
                className="form-control"
                id="rating"
                name="rating"
                value={movie.rating}
                onChange={this.handleChange}/>
            </div>
            */}

            <Input
              title={"Rating"}
              type={"text"}
              name={"rating"}
              value={movie.rating}
              handleChange={this.handleChange}
            />

            {/*
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={movie.description}
                rows="3"
                onChange={this.handleChange}/>
            </div>
            */}
            <TextArea
              title={"Description"}
              type={"description"}
              name={"description"}
              value={movie.description}
              rows={3}
              handleChange={this.handleChange}
            />

            <hr />

            <button className="btn btn-primary">Save</button>
          </form>
          {/*
          <div className="mt-3">
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
          */}
        </> 
      )
    }
  }
}