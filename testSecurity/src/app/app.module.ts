import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback.component';

import {AuthService} from './auth/auth.service';
import { PostsAndCommentsService } from "./service/posts-and-comments.service";


@NgModule({
  declarations: [
    AppComponent,
    CommentListComponent,
    CommentCreateComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    CallbackComponent
    
  ],
  imports: [
    BrowserModule,AppRoutingModule
  ],
  providers: [AuthService,
    PostsAndCommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
