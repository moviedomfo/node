import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostsAndCommentsService} from './../../service/posts-and-comments.service'
import { AuthService } from './../../auth/auth.service';
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

  constructor(private commentService :PostsAndCommentsService,authService:AuthService) { }

  ngOnInit() {
    

    this.commentsSub$ = this.commentService.retriveAllCommentsService()
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
