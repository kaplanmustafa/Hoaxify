import React, { Component } from "react";
import { signup, changeLanguage } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";

class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
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

  onChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);

    changeLanguage(language);
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t } = this.props;

    return (
      <div className="container w-50">
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
            <button
              disabled={pendingApiCall || passwordRepeat !== undefined}
              className="btn btn-primary"
              onClick={this.onClickSignup}
            >
              {pendingApiCall && ( // sol taraf doğruysa sağ tarafı göster (Conditional Rendering)
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              {t("Sign Up")}
            </button>
          </div>
          <div>
            <img
              src="https://www.countryflags.io/tr/flat/24.png"
              alt="Turkish Flag"
              onClick={() => {
                this.onChangeLanguage("tr");
              }}
              style={{cursor: "pointer"}}
            ></img>
            <img
              src="https://www.countryflags.io/us/flat/24.png"
              alt="USA Flag"
              onClick={() => {
                this.onChangeLanguage("en");
              }}
              style={{cursor: "pointer"}}
            ></img>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(UserSignupPage);
