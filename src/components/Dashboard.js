import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, setUserInfo } from "../store/actions";
import styled from "styled-components";
import axiosWithAuth from "./../utils/axiosWithAuth";
import Recipes from "./Recipes";

// import AddRecipe from "./AddRecipe/AddRecipe";
// import PrivateRoute from './PrivateRoute';

//Styles
const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: row wrap;
  gap: 5rem;
  width: 70%;
  height: 100%;
  margin: 5rem auto;
  section {
    flex: 1 1 33.333333%;
    max-width: 20rem;
  }
`;

const Dashboard = (props) => {
  const [userInfo, setUserInfoOG] = useState({});
  const { fetchUser, setUserInfo } = props;
  const { id } = props.userData;

  useEffect(() => {
    // fetchUser();
    axiosWithAuth()
      .get(`api/user/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
        setUserInfoOG(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        //!add action for error handling
      });
  }, [id, fetchUser, setUserInfo]); //** removed props from here to avoid inf loop **/

  console.log(userInfo);

  return (
    <React.Fragment>
      
      {/* user is able to see all the recipes 
      user can click on a recipe
      there user can edit/delete the specific recipe
      
      developer needs:
      ID for each for each recipe
    */}
      {/* isLoggedIn true display edit form */}
      {/* <Route path='' component={}/> */}
      <FlexWrapper>
        <Recipes />
      </FlexWrapper>
      {/* <PrivateRoute
        path="/dashboard/add"
        // component={AddRecipe}
        render={(props) => {
          return <AddRecipe {...props} asdf={"asdf"} />;
        }}
      /> */}
      
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, { fetchUser, setUserInfo })(Dashboard);
