import { Component, OnInit } from '@angular/core';
import { PostsAndCommentsService } from "../../service/posts-and-comments.service";
import { Subscription } from 'rxjs/Subscription';
import { Comment } from "../../model/post";
@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html'
  
})
export class CommentCreateComponent implements OnInit {
  private comments :Comment[];
  private comment:Comment;
  error: any;
 
  constructor(private commentService :PostsAndCommentsService) { }

  ngOnInit() {
    this.comment= new Comment();
    this.comment.postId=12313;
  }


  addComment (){

    var createPostService$ = this.commentService.createPostService(this.comment);
    createPostService$.subscribe(res=>{
      
      this.comments = res as Comment[]; 
      console.log(this.comments);
      this.comments.forEach((item) => {
      //do anything ehitc any item    
      });
   
    }, err => error => this.error = err);
  }
}
