//style reset
import "./App.css";

//packages
import React from "react";
import { Route, Switch } from "react-router-dom";

//components
import PrivateRoute from "./components/PrivateRoute";
import SignUpComponent from "./components/SignUpComponent";
import LoginForm from "./components/LoginForm";
import Nav from "./components/Nav/Nav";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard";
import EditRecipe from "./components/EditRecipe";
import EachRecipe from "./components/EachRecipe";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/dashboard/recipe/edit/:id" component={EditRecipe} />
        <Route path="/dashboard/recipe/:id" component={EachRecipe} />
        <PrivateRoute path="/dashboard/add" component={AddRecipe} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpComponent} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
