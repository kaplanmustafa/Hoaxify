import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  let message = "We Cannot Edit!";

  if (pathUsername === props.loggedInUsername) {
    message = "We Can Edit";
  }

  return <div>{message}</div>;
};

const mapStateToProps = (store) => {
  return {
    loggedInUsername: store.username,
  };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));
