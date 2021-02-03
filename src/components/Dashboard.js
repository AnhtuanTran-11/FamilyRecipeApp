import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, setUserInfo } from "../store/actions";

import axiosWithAuth from "./../utils/axiosWithAuth";
import RecipeCard from "./RecipeCard";

const Dashboard = (props) => {
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo.id);
  const id = 9;
  console.log("Dashboard.js props", props);

  useEffect(() => {
    props.fetchUser()
    axiosWithAuth()
      .get(`api/user/${id}`)
      .then((res) => {
        console.log(res.data);
        props.setUserInfo(res.data)
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        //!add action for error handling
      });
  }, []);

  return (
    <React.Fragment>
      <h1>
        Welcome {userInfo.firstName} {userInfo.lastName}
      </h1>
      {/* user is able to see all the recipes 
      user can click on a recipe
      there user can edit/delete the specific recipe

      developer needs:
      ID for each for each recipe
      */}
      {/* isLoggedIn true display edit form */}
      <RecipeCard />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, {fetchUser, setUserInfo})(Dashboard);
