import { useState, useEffect } from "react";
import React from 'react';
import styled from "styled-components";
import LoginFormMobileWrapper from "./LoginFormMobile";
import * as yup from "yup";
import schema from "../validation/loginFormSchema";
import axios from "axios";
import { useHistory } from "react-router-dom";
import image from "../images/bg.jpg";

import { connect } from "react-redux";
import { setUserId, setUserInfo } from "../store/actions";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useMediaQuery } from "react-responsive";
// import { SET_USERID } from "../store/actions";

// ** STYLING RULES BEGIN HERE ** //

const shellStyleObject = {
  display: "flex",
};

const formDivStyleObject = {
  borderTop: "2px dashed #49BF9D",
  borderLeft: "2px dashed skyblue",
  borderBottom: "2px dashed #49BF9D",
  padding: "1rem",
};

const formDivStyleObjectMobile = {
  border: "2px dashed skyblue",
  padding: "1rem",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
};

const imgStyleObject = {
  height: "30%",
  width: "30%",
};

const FormWrapper = styled.div`
  text-align: center;
  font-family: "Permanent Marker";
  align-items: center;
  flex-grow: 2;
`;

const FormLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormHeaderWrapper = styled.header`
  padding: 0.5rem;
  border-bottom: 1px solid #ffffff;
  font-size: 1.5rem;
`;

const buttonStyleObject = {
  padding: "0.5rem",
  margin: "0.5rem",
  borderRadius: "20%",
  backgroundColor: "white",
  fontSize: "1rem",
  border: "2px solid black",
};

const buttonHoverStyleObject = {
  padding: "0.5rem",
  margin: "0.5rem",
  color: "#49BF9D",
  backgroundColor: "white",
  borderRadius: "20%",
  fontSize: "1rem",
  border: "2px solid #49BF9D",
};
//   border: "2px solid #49BF9D",
//   color: "#FFFFFF",
//   padding: "0.5rem",
//   margin: "0.5rem"

const labelStyleObject = {
  margin: "0.5rem",
  padding: "1rem",
};

const inputStyleObject = {
  margin: "0.5rem",
  borderRadius: "25%",
  backgroundColor: "white",
  borderColor: "black",
  fontColor: "#FFFFFF",
};

// const checkboxStyleObject = {
//   textAlign: "center",
//   margin: "1rem",
//   padding: "0.2rem",
//   fontWeight: "bold",
// };

// ** COMPONENT LOGIC BEGINS HERE **//

const initialFormValues = {
  email: "rloweth9@intel.com",
  password: "MH8A0GkaOkQU",
  // doRemember: false
};

const initialFormErrors = {
  email: "",
  password: "",
};

const initialDisabled = true;
const initialToggle = false;

function LoginForm(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errorValues, setErrorValues] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const toggle = initialToggle;
  const { push } = useHistory();

  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  const handleButtonClick = (event) => {
    event.target.style["background-color"] = "#49BF9D";
    event.target.style["color"] = "white";
  };

  const handleButtonHover = (event) => {
    event.target.style["color"] = "#49BF9D";
    event.target.style["border-color"] = "#49BF9D";
    event.target.style["background-color"] = "white";
  };

  const handleButtonLeave = (event) => {
    event.target.style["color"] = "black";
    event.target.style["border-color"] = "black";
    event.target.style["background-color"] = "#FFFFFF";
  };

  const handleInputHover = (event) => {
    // console.log(event.target.style["background-color"])
    event.target.style["background-color"] = "white";
    event.target.style["border-color"] = "#49BF9D";
    event.target.style["border-radius"] = "25%";
    //event.target.style
  };

  const handleInputLeave = (event) => {
    event.target.style["background-color"] = "white";
    event.target.style["border-color"] = "black";
    event.target.style["font-color"] = "#FFFFFF";
    event.target.style["border-radius"] = "25%";
    event.target.style["margin"] = "0.5rem";
  };
  // ** SUBMIT FUNCTIONS START HERE ** //

  // Helper function. Empty shell for Axios call and state handlers. //
  const submit = () => {
    axios
      .post(
        "https://familyrecipe-app-backend.herokuapp.com/api/auth/login",
        formValues
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        props.setUserId(res.data.id);

        axiosWithAuth()
          .get(`api/user/${res.data.id}`)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("isLoggedIn", "true");
            props.setUserInfo(res.data);
            push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    //!Circle back to reinstate this code.
    //then set initial error values.
    // setErrorValues(initialFormErrors);
    //then set initial form values.
    // setFormValues(initialFormValues);
    // console.log("Hey Dev Team!! Add a POST CALL here!");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  // ** CHANGE FUNCTIONS START HERE  ** //

  // Function to update state with changed values. //
  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrorValues({
          ...errorValues,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrorValues({
          ...errorValues,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function to check type of value + call the value updater. //

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
  };

  // Hook to check validation values against button enablement, e.g. each time values change in state. //
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div>
      {isDesktop && (
        <div className="shell" style={shellStyleObject}>
          <img alt="a delicious meal" src={image} style={imgStyleObject}></img>
          <FormWrapper>
            <div className="form" style={formDivStyleObject}>
              <form onSubmit={onSubmit}>
                <FormHeaderWrapper>
                  <h1>Family Secrets: Login</h1>
                </FormHeaderWrapper>

                <div className="errors">
                  <div className="error">{errorValues.name}</div>
                  <div className="error">{errorValues.size}</div>
                  <div className="error">{errorValues.email}</div>
                </div>

                <FormLabelWrapper>
                  <label className="label" style={labelStyleObject}>
                    {" "}
                    E-mail:
                    <input
                      style={inputStyleObject}
                      type="email"
                      onChange={onChange}
                      name="email"
                      value={formValues.email}
                      onMouseEnter={handleInputHover}
                      onMouseLeave={handleInputLeave}
                    />
                  </label>
                </FormLabelWrapper>

                <FormLabelWrapper>
                  <label className="label" style={labelStyleObject}>
                    {" "}
                    Password:
                    <input
                      style={inputStyleObject}
                      type="password"
                      onChange={onChange}
                      name="password"
                      value={formValues.password}
                      onMouseEnter={handleInputHover}
                      onMouseLeave={handleInputLeave}
                    />
                  </label>
                </FormLabelWrapper>

                {/* <label className="label" style={checkboxStyleObject}>
            {" "}
            remember me
            <input
              style={inputStyleObject}
              type="checkbox"
              onChange={onChange}
              name="doRemember"
              value={formValues.doRemember}
            />
          </label> */}

                <button
                  style={toggle ? buttonHoverStyleObject : buttonStyleObject}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  onClick={handleButtonClick}
                  className="submit"
                  disabled={disabled}
                >
                  submit
                </button>
              </form>
            </div>
          </FormWrapper>
        </div>
      )}
      {isMobile && (
        <div>
          <div className="image">
            <img src={image} alt="Yum"></img>
          </div>
          <LoginFormMobileWrapper>
            <div className="form" style={formDivStyleObjectMobile}>
              <form onSubmit={onSubmit}>
                <FormHeaderWrapper>
                  <h1>Family Secrets: Login</h1>
                </FormHeaderWrapper>

                <div className="errors">
                  <div className="error">{errorValues.name}</div>
                  <div className="error">{errorValues.size}</div>
                  <div className="error">{errorValues.email}</div>
                </div>

                <FormLabelWrapper>
                  <label className="label" style={labelStyleObject}>
                    {" "}
                    E-mail:
                    <input
                      style={inputStyleObject}
                      type="email"
                      onChange={onChange}
                      name="email"
                      value={formValues.email}
                      onMouseEnter={handleInputHover}
                      onMouseLeave={handleInputLeave}
                    />
                  </label>
                </FormLabelWrapper>

                <FormLabelWrapper>
                  <label className="label" style={labelStyleObject}>
                    {" "}
                    Password:
                    <input
                      style={inputStyleObject}
                      type="password"
                      onChange={onChange}
                      name="password"
                      value={formValues.password}
                      onMouseEnter={handleInputHover}
                      onMouseLeave={handleInputLeave}
                    />
                  </label>
                </FormLabelWrapper>

                {/* <label className="label" style={checkboxStyleObject}>
            {" "}
            remember me
            <input
              style={inputStyleObject}
              type="checkbox"
              onChange={onChange}
              name="doRemember"
              value={formValues.doRemember}
            />
          </label> */}

                <button
                  style={toggle ? buttonHoverStyleObject : buttonStyleObject}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  onClick={handleButtonClick}
                  className="submit"
                  disabled={disabled}
                >
                  submit
                </button>
              </form>
            </div>
          </LoginFormMobileWrapper>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
  //! for this component I don't need anything *from* state.
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLogin: (userID) => dispatch({ type: SET_USERID, payload: userID })
//   };
// };

//!I think dispatch is implicitly called /passed to the second argument of connect...?
export default connect(mapStateToProps, { setUserId, setUserInfo })(LoginForm);
