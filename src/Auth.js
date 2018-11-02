import auth0 from "auth0-js";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: "learnteachcenter.auth0.com",
      audience: "https://learnteachcenter.auth0.com/userinfo",
      clientID: "OyNqap4TsOwwhgp9m83rtRT0dCdOCZgT",
      redirectUri: "http://localhost:3001/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  setSession(authResult, step) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    this.auth0.logout({
      returnTo: "http://localhost:3001",
      clientID: "OyNqap4TsOwwhgp9m83rtRT0dCdOCZgT"
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
