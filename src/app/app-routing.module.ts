import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './guard/auth.guard'

import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

export const appRoutes:Routes = [
  {path: 'login',component: LoginFormComponent},
  {path: 'signup',component: SignupFormComponent},
  {path: 'chat',component: ChatroomComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
