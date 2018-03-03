
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostsAndCommentsService} from './../../service/posts-and-comments.service'

import { Subscription } from 'rxjs/Subscription';
import { Comment } from "../../model/post";

@Component({
  selector: 'app-private-comments',
  templateUrl: './private-comments.component.html'

})
export class PrivateCommentsComponent implements OnInit {

  commentsSub$ : Subscription;
  private comments :Comment[];
  error: any;
 
   constructor(private commentService :PostsAndCommentsService) { }

  ngOnInit() {

    
    this.commentsSub$ = this.commentService.retriveAllPrivateCommentsService()
     .subscribe(
      comments => {
        this.comments = comments;
      },
      err => error => this.error = err
    );
  }
  ngOnDestroy() {
    this.commentsSub$.unsubscribe();
  }
}
