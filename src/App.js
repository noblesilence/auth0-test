import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import auth0Client from "./Auth";
import Callback from "./Callback";
import "./App.css";

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === "/callback") return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === "login_required") return;
      console.log(err.error);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/callback" component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
