import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import RecipeCard from "./RecipeCard";

//Styles//
const CardContainer = styled.div`
  * {
    text-rendering: geometricPrecision;
  }
  a {
    text-decoration: none;
    color: black;
  }
  a:visited {
    color: black;
    text-decoration: none;
  }
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    flex-direction: row;
  }
`;
const CardWrapper = styled.div`
  &:hover {
    cursor: pointer;
    -webkit-animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    @-webkit-keyframes scale-up-center {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      100% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
    @keyframes scale-up-center {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      100% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
  display: grid;
  grid-template-columns: 20rem;
  grid-template-rows: 15rem 13rem 5rem;
  grid-template-areas: "image" "text" "stats";
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
  .cardImage {
    grid-area: "image";
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-size: cover;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .cardText {
    grid-area: "text";
    margin: 25px;
    max-height: 10rem;
    height: 10rem;
  }
  .cardText h2 {
    margin-top: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .cardText p:nth-last-child(1) {
    color: grey;
    font-size: 1rem;
    font-weight: bold;
    position: relative;
    top: 7rem;
    width: auto;
    text-align: center;
    overflow: hidden;
    text-overflow: hidden;
  }
  .cardText p:nth-of-type(1) {
    font-weight: bold;
  }
  .cardStats {
    grid-area: "stats";
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #4abf9d;
    position: relative;
    top: 1.5rem;
  }
  .cardStats .stat {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    padding: 0.7rem;
  }
  .cardStats .type {
    font-size: 0.7rem;
    font-weight: 300;
    text-transform: uppercase;
  }
  .cardStats .value {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .cardStats .border {
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
  .cardStats .value sup {
    font-size: 1rem;
  }
`;

function Recipes(props) {
  // console.log(props);
  const { userData } = props;
  const [recipe] = useState(userData.recipes);
  // console.log(recipe);

  return (
    <React.Fragment>
      {recipe &&
        recipe.map((reci, i) => {
          return (
            <section key={i}>
              <CardContainer>
                <Link
                  className="link"
                  key={i}
                  to={`/dashboard/recipe/${reci.id}`}
                >
                  <CardWrapper className="card">
                    <RecipeCard reci={reci} key={reci.id} />
                  </CardWrapper>
                </Link>
              </CardContainer>
            </section>
          );
        })}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    ...state,
    id: state.userData.id,
    firstName: state.userData.firstName,
    error: state.error,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(Recipes);
