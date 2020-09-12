import React, { Component } from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target; // Object Destructuring
    const errors = { ...this.state.errors }; // Objenin kopyasını alma
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
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

    try {
      const response = await signup(body); // async ve await ile signup işlemi tamamlandıktan sonra alt satıra geçer
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
        });
      }
    }
  };

  render() {
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t, pendingApiCall } = this.props;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          />
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          />
          <div className="text-center">
            <ButtonWithProgress
              disabled={pendingApiCall || passwordRepeat !== undefined}
              onClick={this.onClickSignup}
              pendingApiCall={pendingApiCall}
              text={t("Sign Up")}
            ></ButtonWithProgress>
          </div>
        </form>
      </div>
    );
  }
}

// Higher Order Component --> withTranslation ve withApiProgress
const UserSignupPageWithApiProgress = withApiProgress(
  UserSignupPage,
  "/api/1.0/users"
);
const UserSignupPageWithTranslation = withTranslation()(
  UserSignupPageWithApiProgress
);

export default UserSignupPageWithTranslation;
