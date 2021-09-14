import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import validationSchema from "../validation/validationSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

//Initial form value
const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//Initial form errors
const initialFormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//Initial users
const initialDisabled = [];

//<<<<<<<<<<<Styles>>>>>>>>>>//
// Toggle password icon
// const eye = <FontAwesomeIcon icon={faEye} />;
//Global style
const GlobalStyle = createGlobalStyle`
html {
  height: 100vh;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  color: #a2a2a2;
  height: 100vh;
  text-rendering: geometricPrecision;
}
`;
//Shared styles
const sharedStyles = css`
  background-color: #fff;
  height: 3rem;
  box-sizing: border-box;
  border-radius: 0.35em;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
`;
//Wrapper
const StyledFormWrapper = styled.div`
  display: flex;
  height: 100vh;
  padding: 0;
  @media only screen and (max-width: 1600px) {
    display: flex;
    justify-content: center;
  }
  #header {
    display: flex;
    width: 35%;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: left;
    height: 100%;
    filter: opacity(60%);
    object-fit: cover;
    margin: 0 auto auto 0;
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-fill-mode: both;
  }
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
//H1
const H1 = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-right: 4rem;
  display: flex;
  text-align: center;
  color: black;
  position: relative;
  width: 10%;
  top: 30%;
  text-shadow: 1px 0px 2px rgba(21, 20, 20, 0.46);
  @media only screen and (max-width: 1600px) {
    top: 5%;
    margin: 0 auto;
    right: -30%;
    font-size: 3rem;
  }
  @media only screen and (max-width: 775px) {
    left: 20%;
  }
  @media only screen and (max-width: 500px) {
    left: 15%;
  }
  -webkit-animation-name: slideInDown;
  animation-name: slideInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  @-webkit-keyframes slideInDown {
    0% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-200%);
      visibility: visible;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes slideInDown {
    0% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-200%);
      visibility: visible;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
`;
//Styled eye
const Eye = styled.i`
  display: flex;
  justify-content: flex-end;
  position: relative;
  float: right;
  margin-right: 25px;
  margin-top: -50px;
  &:hover {
    border-color: #49bf9d;
    color: #49bf9d;
    cursor: pointer;
  }
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
`;
//Styled form
const StyledForm = styled.form`
  height: 80vh;
  padding: 2rem;
  min-width: 40%;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  margin: auto;
  @media only screen and (max-width: 1600px) {
    position: relative;
    top: 15%;
    left: -13%;
    min-width: 60%;
    margin-left: 10%;
  }
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  @-webkit-keyframes fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
`;

//Styled inputs
const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles};
`;
//Styled buttons
const StyledButton = styled.button`
  display: block;
  position: relative;
  left: 40%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-radius: 0.35em;
  border: solid 3px #efefef;
  @media only screen and (max-width: 775px) {
    display: inline-block;
    left: 30%;
  }
  @media only screen and (max-width: 550px) {
    display: inline-block;
    left: 20%;
  }
  &:hover {
    border-color: #49bf9d;
    color: #49bf9d;
  }
  color: #787878;
  cursor: ${(prop) => (prop.disabled === false ? "pointer" : "not-allowed")};
  font-weight: 400;
  height: calc(2.75em + 6px);
  min-width: 10em;
  padding: 0 1.5em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
`;
//Styled error messages
const StyledError = styled.div`
  color: red;
  font-weight: 600;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
`;
export default function SignUpComponent() {
  //States
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [passwordShown, setPasswordShown] = useState(false);
  //Toggles password to be visible
  const togglePasswordVisibility = (event) => {
    setPasswordShown(passwordShown ? false : true);
    event.preventDefault();
  };
  //Form submit
  const formSubmit = () => {
    const newUser = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };
  //Form submit event handler
  const onSubmit = (event) => {
    event.preventDefault();
    formSubmit();
  };

  //Use history hook
  const history = useHistory();
  //Axios post request
  const postNewUser = (newUser) => {
    axios
      .post(
        "https://familyrecipe-app-backend.herokuapp.com/api/auth/register",
        newUser
      )
      .then((res) => {
        console.log(res);
        setFormValues(initialFormValues);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Input change
  const inputChange = (name, value) => {
    yup
      .reach(validationSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  //Disabled button when form isn't valid
  useEffect(() => {
    validationSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  //Input change event handler
  const onChange = (event) => {
    const { name, value } = event.target;
    inputChange(name, value);
  };

  return (
    <div>
      <GlobalStyle key="globalStyle" />
      <StyledFormWrapper key="formWrapper">
        <img
          src="https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1230&q=80"
          id="header"
          alt=""
        />
        <H1>Create your account.</H1>
        <StyledForm key="styledForm" onSubmit={onSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <StyledInput
              value={formValues.firstName}
              onChange={onChange}
              name="firstName"
              type="text"
              placeholder="First Name"
              key="firstName"
            />

            <label htmlFor="lastName">Last Name</label>
            <StyledInput
              value={formValues.lastName}
              onChange={onChange}
              name="lastName"
              type="text"
              placeholder="Last Name"
              key="lastName"
            />

            <label htmlFor="email">Email</label>
            <StyledInput
              value={formValues.email}
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="username"
              key="email"
            />

            <label htmlFor="password">Password</label>
            <StyledInput
              value={formValues.password}
              onChange={onChange}
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              key="password"
            />
            <Eye key="eye2" onClick={togglePasswordVisibility}>
              {eye}
            </Eye>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <StyledInput
              value={formValues.confirmPassword}
              onChange={onChange}
              name="confirmPassword"
              type={passwordShown ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              key="confirmPassword"
            />
            <Eye key="eye" onClick={togglePasswordVisibility}>
              {eye}
            </Eye>

            <StyledButton
              key="styledButton"
              id="submitButton"
              disabled={disabled}
              type="submit"
            >
              Submit
            </StyledButton>

            {/* Render form errors */}
            <StyledError key="styledError">
              <div>{formErrors.firstName}</div>
              <div>{formErrors.lastName}</div>
              <div>{formErrors.email}</div>
              <div>{formErrors.password}</div>
              <div>{formErrors.confirmPassword}</div>
            </StyledError>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </div>
  );
}
