import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PostsAndCommentsService {
// Define the routes we are going to interact with
private publicDealsUrl = 'http://localhost:8080/api/deals/public';
private privateDealsUrl = 'http://localhost:8080/api/deals/private';

  constructor(private http: HttpClient) { }


  retryveAllPostService(){

  }


  retryveAllCommentsService(){
    
  }
}
