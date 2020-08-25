import {Routes} from '@angular/router'

import { LoginFormComponent } from './src/app/login-form/login-form.component';
import { SignupFormComponent } from './src/app/signup-form/signup-form.component';
import { ChatroomComponent } from './src/app/chatroom/chatroom.component';

export const appRoutes:Routes = [
    {path: 'login',component: LoginFormComponent},
    {path: 'signup',component: SignupFormComponent},
    {path: 'chat',component: ChatroomComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
]
