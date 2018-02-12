import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsAndCommentsService } from "../service/posts-and-comments.service";
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
//import { Deal } from '../deal';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit,OnDestroy  {

 private posts:any;
 private error:any;
  constructor(
    public postsAndComments: PostsAndCommentsService,
    public authService: AuthService) { }

  ngOnInit() {
    this.postsAndComments = this.postsAndComments
      .getPublicDeals()
      .subscribe(
        posts => this.posts = posts,
        err => this.error = err
      );
  }

  ngOnDestroy() {
    this.dealsSub.unsubscribe();
  }

}
