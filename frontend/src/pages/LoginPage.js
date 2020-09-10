import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
  };

  onClickLogin = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };

    login(creds);
  };

  render() {
    const { t } = this.props;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            label={t("Username")}
            name="username"
            onChange={this.onChange}
          ></Input>
          <Input
            label={t("Password")}
            name="password"
            onChange={this.onChange}
            type="password"
          ></Input>
          <div className="text-center">
            <button className="btn btn-primary" onClick={this.onClickLogin}>
              {t("Login")}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LoginPage);
