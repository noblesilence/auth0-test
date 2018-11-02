import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import auth0Client from "../../Auth";

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Learn Teach Center School
        </Typography>
        {!auth0Client.isAuthenticated() && (
          <Fragment>
            <Button
              component={Link}
              to="register"
              color="inherit"
              variant="outlined"
            >
              Sign Up
            </Button>
            <Button color="inherit" onClick={auth0Client.signIn}>
              Login
            </Button>
          </Fragment>
        )}
        {auth0Client.isAuthenticated() && (
          <Fragment>
            <Button color="inherit">Courses</Button>
            <Button color="inherit" onClick={signOut()}>
              Logout
            </Button>
            <Typography>User Name</Typography>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(NavBar);
