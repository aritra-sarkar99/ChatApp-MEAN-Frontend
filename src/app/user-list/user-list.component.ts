import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

import {AuthService} from '../services/auth.service'

import {User} from '../models/User'
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{


  users:User[] = [];
  panelExpanded = false
  @Output() userClickEvent:EventEmitter<string> = new EventEmitter<string>()
  @Output() ClickValue:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private auth:AuthService) { }

  ngOnInit(): void {

      this.auth.getUserList().subscribe(data => {
        this.users = data
      })
  }

  receiveUser(eventdata:string){
    this.userClickEvent.emit(eventdata)
  }
  receiveClick(eventdata:boolean){
    this.ClickValue.emit(eventdata)
  }
  logout(){
    this.auth.logout()
  }

}
