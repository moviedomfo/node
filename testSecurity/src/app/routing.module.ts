import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';
import { CallbackComponent } from './callback.component';
// Import the AuthGuard
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'postList', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'postList', component: PostListComponent },
  {
    path: 'postCreate', component: PostCreateComponent, canActivate: [
      AuthGuard
    ]
  },

  { path: 'commentCreate', component: CommentCreateComponent },
  { path: 'commentList', component: CommentListComponent },
  {
    path: 'callback', component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }