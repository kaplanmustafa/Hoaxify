import React from "react";
import { useSelector } from "react-redux";
import defaultPicture from "../assets/profile.png";

const ProfileImageWithDefault = (props) => {
  const { image } = props;

  let imageSource = defaultPicture;

  if (image) {
    imageSource = image;
  }

  return <img src={imageSource} {...props} />;
};

export default ProfileImageWithDefault;
