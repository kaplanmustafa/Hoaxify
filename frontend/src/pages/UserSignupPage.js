import React, { Component } from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";

export default class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target; // Object Destructuring
    const errors = { ...this.state.errors }; // Objenin kopyasını alma
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = "Password mismatch";
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = "Password mismatch";
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { username, displayName, password, passwordRepeat } = this.state;

    const body = {
      username, // username: username
      displayName,
      password,
      passwordRepeat,
    };

    this.setState({ pendingApiCall: true });

    try {
      const response = await signup(body); // async ve await ile signup işlemi tamamlandıktan sonra alt satıra geçer
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
        });
      }
    }

    this.setState({ pendingApiCall: false });

    // signup(body)
    //   .then((response) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ pendingApiCall: false });
    //   });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;

    return (
      <div className="container w-50">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <Input
            name="username"
            label="Username"
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayName"
            label="Display Name"
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label="Password"
            error={password}
            onChange={this.onChange}
            type="password"
          />
          <Input
            name="passwordRepeat"
            label="Password Repeat"
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          />
          <div className="text-center">
            <button
              disabled={pendingApiCall || passwordRepeat !== undefined}
              className="btn btn-primary"
              onClick={this.onClickSignup}
            >
              {pendingApiCall && ( // sol taraf doğruysa sağ tarafı göster (Conditional Rendering)
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
