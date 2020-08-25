import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


import {AuthService} from '../services/auth.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isAuth = localStorage.getItem('isAuth')
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {

  }
  
}
