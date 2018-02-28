import { Injectable } from '@angular/core';
//import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Post,Comment } from "../model/post";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HealtConstants } from "../model/common";

import 'rxjs/add/operator/map'
@Injectable()
export class PostsAndCommentsService {
// Define the routes we are going to interact with
private baseUrl = 'http://localhost:8080/api/placeHolders';
private privateDealsUrl = this.baseUrl + 'priv';

  constructor(private http: Http) { }


  retriveAllPostService():Observable<Post[]>{

   

      return this.http.get(`${this.baseUrl}/postList'}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let posts :Post[] = res.json();
     
        return posts;
      });
  
  }
 createPostService(comment:Comment):Observable<Comment[]>{

 //'http://localhost:8080/api/placeHolders/addComment';
 
    let params = {
      "comment" : comment
  };
      return this.http.post(`${this.baseUrl}/addComment`,params, HealtConstants.httpOptions)
      .map(function (res: Response) {
         
        let comments :Comment[] = res.json() as Comment[];
    
        
        console.log(comments);
        return comments;
      });
  
  }
  



  retriveAllCommentsService():Observable<Comment[]>{

    return this.http.get(`${this.baseUrl}/commentList`, HealtConstants.httpOptions)
    .map(function (res: Response) {

      let reuslt :Comment[] = res.json();
      console.log(JSON.stringify(res));
      return reuslt;
    });
  
    // return this.http.get(this.privateDealsUrl, {
    //   headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    // })
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

 
  // Implement a method to handle errors if any
  // private handleError(err: HttpErrorResponse | any) {
  //   console.error('An error occurred', err);
  //   return Observable.throw(err.message || err);
  // }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
