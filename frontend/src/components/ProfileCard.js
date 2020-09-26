import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import Input from "./Input";
import { updateUser } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import { useParams } from "react-router-dom";

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();

  const routeParams = useParams();
  const pathUsername = routeParams.username;

  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  const { username, displayName, image } = user;

  const onChangeFile = (event) => {
    if (event.target.files.length < 1) {
      return;
    }

    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file); // Bu işlemden sonra onloadend çağırılır
  };

  const pendingApiCall = useApiProgress("put", "/api/1.0/users/" + username);

  const { t } = useTranslation();

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

  const onClickSave = async () => {
    let image;
    if (newImage) {
      image = newImage.split(",")[1];
    }

    const body = {
      displayName: updatedDisplayName,
      image,
    };

    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
    } catch (error) {}
  };

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault
          className="rounded-circle shadow"
          width="200"
          height="200"
          alt={`${username} profile`}
          image={image}
          tempimage={newImage}
        />
      </div>
      <div className="card-body">
        {!inEditMode && (
          <>
            <h3>
              {displayName}@{username}
            </h3>
            {editable && (
              <button
                className="btn btn-success d-inline-flex"
                onClick={() => setInEditMode(true)}
              >
                <span className="material-icons">edit</span>
                {t("Edit")}
              </button>
            )}
          </>
        )}
        {inEditMode && (
          <div>
            <Input
              label={t("Change Display Name")}
              defaultValue={displayName}
              onChange={(event) => {
                setUpdatedDisplayName(event.target.value);
              }}
            />
            <input
              type="file"
              onChange={onChangeFile}
              className="btn form-control-file"
            />
            <div>
              <ButtonWithProgress
                className="btn btn-primary d-inline-flex"
                onClick={onClickSave}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text={
                  <>
                    <span className="material-icons">save</span>
                    {t("Save")}
                  </>
                }
              />
              <button
                className="btn btn-danger d-inline-flex ml-1"
                onClick={() => setInEditMode(false)}
                disabled={pendingApiCall}
              >
                <span className="material-icons">cancel</span>
                {t("Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
