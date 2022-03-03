import React, { Component } from 'react';
import Input from './form-components/Input';
import Alert from './ui-components/Alert';

export default class Login extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      email: "",
      password: "",
      error: null,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (evt) => { 
    let value = evt.target.value
    let name = evt.target.name
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    // client side validation
    let errors = [];
    if (this.state.email === "") {
      errors.push("email");
    }
    if (this.state.password === "") {
      errors.push("password");
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

    fetch("http://localhost:4000/v1/signin", requestOptions)
    .then(response => response.json())
    .then(data => {
      if(data.error){
        this.setState({
          alert: {type: "alert-danger", message: data.error.message}
        })
      }else{
        console.log(data)
        this.handleJWTChange(Object.values(data)[0])
        window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]))
        this.props.history.push({
          pathname: "/admin",
        })
      }
    })
  }

  handleJWTChange(jwt){
    this.props.handleJWTChange(jwt)
  }

  hasError(key){
    return this.state.errors.indexOf(key) !== -1;
  }

  render(){
    return(
      <>
        <h2>Login</h2>
        <hr />
        <Alert
          alertType={this.state.alert.type}
          alertMessage={this.state.alert.message}
        />

        <form onSubmit={this.handleSubmit}>

          <Input
            title={"Email"}
            type={"email"}
            name={"email"}
            handleChange={this.handleChange}
            className={this.hasError("email") ? "is-invalid" : ""}
            errDiv={this.hasError("email") ? "text-danger" : "d-none"}
            errMessage={"Please enter a valid email address"}
          />

          <Input
            title={"Password"}
            type={"password"}
            name={"password"}
            handleChange={this.handleChange}
            className={this.hasError("password") ? "is-invalid" : ""}
            errDiv={this.hasError("password") ? "text-danger" : "d-none"}
            errMessage={"Please enter a password"}
          />

          <hr />

          <button className="btn btn-primary">Login</button>
        </form>
      </>
    )
  }
}