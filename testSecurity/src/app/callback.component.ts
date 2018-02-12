import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-callback',
  template: `
    <p>
        Loading...
    </p>
  `,
  styles: []
})

//it will process the redirect from Auth0 and ensure we recieved 
//the right data back in the hash after a successful authentication
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //Once a user is authenticated, 
    //Auth0 will redirect back to our application and call the /callback route
    //Auth0 will also append the id_token as well as the access_token to this request, 
    //and our CallbackComponent will make sure to properly process and store those tokens in localStorage.
    //If all is well, meaning we recieved an id_token and an access_token, 
    //we will be redirected back to the homepage and will be in a logged in state.

    this.authService.handleAuth();
  }

}
