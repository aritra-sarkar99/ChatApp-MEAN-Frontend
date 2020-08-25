import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {AuthService} from '../services/auth.service'
import {User} from '../models/User'


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [AuthService]
})
export class LoginFormComponent implements OnInit {

  // public tokenTimer: any;
  error:string;
  alert = {
    error:false,
    message:''
  }

  // private authService:AuthService
  // private router:Router
  constructor(private authService:AuthService,private router:Router) {

   }

  ngOnInit(): void {

  }

  submitForm(form){
      let user:User = {
        email: form.value.email,
        password: form.value.password
      }
      // this.router.navigate(['chat'])

      if(form.valid){
        this.authService.login(user).subscribe(response => {
          if(response.token){
            const expireDuration = response.expiresIn
            localStorage.setItem('token',response.token)
            localStorage.setItem('isAuth','true')
            this.router.navigate(['chat'])
          }
          else if(response.error){
            this.alert.error = true
            this.alert.message = response.message
          }
          
        })
  
      }else{
        this.alert.error = true
        this.alert.message = 'Fill the form as instructed'
      }
  }

}
