import React from "react";
import { useSelector } from "react-redux";
import HoaxFeed from "../components/HoaxFeed";
import HoaxSubmit from "../components/HoaxSubmit";
import UserList from "../components/UserList";

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          {isLoggedIn && (
            <div className="mb-1">
              <HoaxSubmit />
            </div>
          )}
          <HoaxFeed />
        </div>
        <div className="col-5">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
