import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';

import { Router } from '@angular/router';;

@Injectable()
export class AuthService {

  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: 'AlHia91wIeqUreq3P8krl7t2zsc1R9FO',
    domain: 'pelsoftmfo.auth0.com',
    responseType: 'token id_token',
    audience: 'https://pelsoftmfo.auth0.com/userinfo',
    redirectUri: 'http://localhost:8080/callback',
    scope: 'openid'
  });

  userProfile: any;
  //Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property and update login status subject
    // If token is expired, log out to clear any data from localStorage
    if (this.authenticated) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    } else {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }
  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

//handleAuthentication from https://manage.auth0.com/#/clients/AlHia91wIeqUreq3P8krl7t2zsc1R9FO/quickstart
  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }
  /// Use access token to retrieve user's profile and set session
  private _getProfile(authResult) {
  
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  /// Save session data and update login status subject
  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('x-access-token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.userProfile = profile;
    this.setLoggedIn(true);
  }

  // Remove tokens and profile and update login status subject
  logout() {
    
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
    this.setLoggedIn(false);
  }

  // Check if current date is greater than expiration
  // if it expires  means that current session was terminated or is not available
  get authenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }
  
  //Este metodo viene de la pagina de https://manage.auth0.com/#/clients/AlHia91wIeqUreq3P8krl7t2zsc1R9FO/quickstart
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
