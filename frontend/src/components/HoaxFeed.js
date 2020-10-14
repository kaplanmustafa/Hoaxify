import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  getHoaxes,
  getNewHoaxCount,
  getNewHoaxes,
  getOldHoaxes,
} from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import HoaxView from "./HoaxView";
import Spinner from "./Spinner";

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const [newHoaxCount, setNewHoaxCount] = useState(0);

  const { t } = useTranslation();
  const { username } = useParams();

  let lastHoaxId = 0;
  let firstHoaxId = 0;
  if (hoaxPage.content.length > 0) {
    firstHoaxId = hoaxPage.content[0].id;

    const lastHoaxIndex = hoaxPage.content.length - 1;
    lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
  }

  const path = username
    ? `/api/1.0/users/${username}/hoaxes?page=`
    : "/api/1.0/hoaxes?page=";

  const initialHoaxLoadProgress = useApiProgress("get", path);
  const oldHoaxPath = username
    ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}`
    : `/api/1.0/hoaxes/${lastHoaxId}`;

  const loadOldHoaxesProgress = useApiProgress("get", oldHoaxPath, true);

  const newHoaxPath = username
    ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after`
    : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;

  const loadNewHoaxesProgress = useApiProgress("get", newHoaxPath, true);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await getNewHoaxCount(firstHoaxId, username);
        setNewHoaxCount(response.data.count);
      } catch (error) {}
    };

    let looper = setInterval(getCount, 2000);

    return function cleanup() {
      clearInterval(looper);
    };
  }, [firstHoaxId, username]);

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const response = await getHoaxes(username, page);
        setHoaxPage((previousHoaxPage) => ({
          ...response.data,
          content: [...previousHoaxPage.content, ...response.data.content],
        }));
      } catch (error) {}
    };

    loadHoaxes();
  }, [username]);

  const loadOldHoaxes = async () => {
    try {
      const response = await getOldHoaxes(lastHoaxId, username);
      setHoaxPage((previousHoaxPage) => ({
        ...response.data,
        content: [...previousHoaxPage.content, ...response.data.content],
      }));
    } catch (error) {}
  };

  const loadNewHoaxes = async () => {
    try {
      const response = await getNewHoaxes(firstHoaxId, username);
      setHoaxPage((previousHoaxPage) => ({
        ...previousHoaxPage.content,
        content: [...response.data, ...previousHoaxPage.content],
      }));
      setNewHoaxCount(0);
    } catch (error) {}
  };

  const onDeleteHoaxSuccess = (id) => {
    setHoaxPage((previousHoaxPage) => ({
      ...previousHoaxPage.content,
      content: previousHoaxPage.content.filter((hoax) => hoax.id !== id),
    }));
  };

  const { content, last } = hoaxPage;

  if (content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {initialHoaxLoadProgress ? <Spinner /> : t("There are no hoaxes")}
      </div>
    );
  }

  return (
    <div>
      {newHoaxCount > 0 && (
        <div
          className="alert alert-secondary text-center mb-1 bg-primary text-white"
          style={{ cursor: loadNewHoaxesProgress ? "not-allowed" : "pointer" }}
          onClick={loadNewHoaxesProgress ? () => {} : loadNewHoaxes}
        >
          {loadNewHoaxesProgress ? <Spinner /> : t("There are new hoaxes")}
        </div>
      )}
      {content.map((hoax) => {
        return (
          <HoaxView
            key={hoax.id}
            hoax={hoax}
            onDeleteHoax={onDeleteHoaxSuccess}
          />
        );
      })}
      {!last && (
        <div
          className="alert alert-secondary text-center mt-1 bg-primary text-white"
          style={{ cursor: loadOldHoaxesProgress ? "not-allowed" : "pointer" }}
          onClick={loadOldHoaxesProgress ? () => {} : loadOldHoaxes}
        >
          {loadOldHoaxesProgress ? <Spinner /> : t("Load Old Hoaxes")}
        </div>
      )}
    </div>
  );
};

export default HoaxFeed;
