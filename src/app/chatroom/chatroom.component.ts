import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {AuthService} from '../services/auth.service'

import {FeedComponent} from '../feed/feed.component' 
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit,AfterViewInit{

  @ViewChild(FeedComponent) feedComp:FeedComponent;
  clickeduser = {}

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){

  }

  receiveUser(eventdata:string){
    // this.clickeduser = JSON.parse(eventdata)
    this.feedComp.setUser(eventdata)
  }

  receiveClick(eventdata:boolean){
    this.feedComp.setClickValue(eventdata)
  }


}
