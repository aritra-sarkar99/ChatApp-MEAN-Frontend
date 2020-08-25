import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms'

import {User} from '../models/User'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  user:User;
  alert = {
    error:false,
    message:''
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    
  }
  
  SignUp(form:NgForm){
    let user:User = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    }

    if(form.valid){
      this.authService.signup(user).subscribe(data => {
        if(data.error){
          this.alert.error = true
          this.alert.message = data.message
        }
        else if(data.success){
          this.alert.error = false
          this.alert.message = data.message
        }
      })
  
    }
    else{
      this.alert.error = true
      this.alert.message = 'Fill up as per instructions'
    }
    
  
  }

}
