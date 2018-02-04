import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 import { PostListComponent } from './posts/post-list/post-list.component';
 import { PostCreateComponent } from './posts/post-create/post-create.component';
 import { CommentListComponent } from './comments/comment-list/comment-list.component';
 import {  CommentCreateComponent } from './comments/comment-create/comment-create.component';
 import { CallbackComponent } from './callback.component';
// Import the AuthGuard
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'postlist',
    component: PostListComponent
  },
  {
    path: 'postCreate',
    component: PostCreateComponent,
     canActivate: [
      AuthGuard
      ]
  },
  
  {
    path: 'commentCreate',
    component: CommentCreateComponent
  },
  {
    path: 'commentCreate',
    component: CommentListComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }