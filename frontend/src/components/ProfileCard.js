import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Authentication } from "../shared/AuthenticationContext";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  const loggedInUsername = props.username;
  let message = "We Cannot Edit!";

  if (pathUsername === loggedInUsername) {
    message = "We Can Edit";
  }

  return <div>{message}</div>;
};

class ProfileCardContextWrapper extends Component {
  static contextType = Authentication;

  render() {
    return (
      <ProfileCard {...this.props} username={this.context.state.username} />
    );
  }
}

export default withRouter(ProfileCardContextWrapper);
