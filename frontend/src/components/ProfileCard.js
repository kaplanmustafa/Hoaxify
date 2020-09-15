import React from "react";
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

export default withRouter(ProfileCard);
