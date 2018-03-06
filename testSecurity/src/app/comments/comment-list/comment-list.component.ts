import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostsAndCommentsService} from './../../service/posts-and-comments.service'

import { Subscription } from 'rxjs/Subscription';
import { Comment } from "../../model/post";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html'

})
export class CommentListComponent implements OnInit {
 //aqui podria haber usado un Observable : ej :  commentsSub$ : Observable<comment[]>;
 commentsSub$ : Subscription;
 private comments :Comment[];
 error: any;

  constructor(private commentService :PostsAndCommentsService) { }

  ngOnInit() {
    

    this.commentsSub$ = this.commentService.retriveAllCommentsService()
     .subscribe(
      comments => {
        this.comments = comments;
      },
      err => this.error = err
    );

  }
  ngOnDestroy() {
    this.commentsSub$.unsubscribe();
  }

}
