import React, { Component } from "react";
import auth0Client from "../../Auth";

class Dashboard extends Component {
  render() {
    console.log(auth0Client.isAuthenticated());
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
