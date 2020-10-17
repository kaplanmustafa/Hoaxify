import React from "react";
import defaultPicture from "../assets/profile.png";

const ProfileImageWithDefault = (props) => {
  const { image, tempimage } = props;

  let imageSource = defaultPicture;

  if (image) {
    imageSource = "/images/profile/" + image;
  }

  if (tempimage === "delete-profile-photo") {
    imageSource = defaultPicture;
  }

  return (
    <img
      src={tempimage || imageSource}
      {...props}
      onError={(event) => {
        event.target.src = defaultPicture;
      }}
      alt="user-profile-img"
    />
  );
};

export default ProfileImageWithDefault;
