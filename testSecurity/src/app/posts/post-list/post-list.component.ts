import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostsAndCommentsService} from './../../service/posts-and-comments.service'
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Post } from "../../model/post";
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  //aqui podria haber usado un Observable : ej :  postsSub$ : Observable<Post[]>;
 postsSub$ : Subscription;
 private posts :Post[];
  
 error: any;
  constructor(private postService :PostsAndCommentsService,authService:AuthService) { }

  ngOnInit() {
    

    this.postsSub$ = this.postService
    .retriveAllPostService()
    .subscribe(
      posts => {
        this.posts = posts;
      },
      err => error => this.error = err
    );

  }
  ngOnDestroy() {
    this.postsSub$.unsubscribe();
  }
}
