import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      error: null,
    });
  };

  onChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
  };

  onClickLogin = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };

    this.setState({
      error: null,
    });

    try {
      await login(creds);
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password; // 2 değerin varlığına göre buttonEnabled'a true veya false atar

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            label={t("Username")}
            name="username"
            onChange={this.onChange}
          />
          <Input
            label={t("Password")}
            name="password"
            onChange={this.onChange}
            type="password"
          />
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          <div className="text-center">
            <ButtonWithProgress
              disabled={!buttonEnabled || pendingApiCall}
              onClick={this.onClickLogin}
              pendingApiCall={pendingApiCall}
              text={t("Login")}
            ></ButtonWithProgress>
          </div>
        </form>
      </div>
    );
  }
}

// Higher Order Component --> withTranslation ve withApiProgress
const LoginPageWithApiProgress = withApiProgress(LoginPage, "/api/1.0/auth");
const LoginPageWithTranslation = withTranslation()(LoginPageWithApiProgress);

export default LoginPageWithTranslation;
