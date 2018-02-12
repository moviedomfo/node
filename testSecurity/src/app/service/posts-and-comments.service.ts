import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PostsAndCommentsService {
// Define the routes we are going to interact with
private publicDealsUrl = 'http://localhost:8080/postList';
private privateDealsUrl = 'http://localhost:8080/commentList';

  constructor(private http: HttpClient) { }


  retriveAllPostService(){
    return this.http
      .get(this.publicDealsUrl)
      .pipe(
        catchError(this.handleError)
      );

  
  }


  retriveAllCommentsService(){
    return this.http
    .get(this.privateDealsUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    })
    .pipe(
      catchError(this.handleError)
    );
  }
  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
