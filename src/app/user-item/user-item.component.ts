import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {ChatService} from '../services/chat.service'
import {User} from '../models/User'

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user:User;
  clickeduser = {}
  clicked:boolean = true;
  senderId:string;
  lastmsg:any = {};


  @Output() userClickEvent:EventEmitter<string> = new EventEmitter<string>()
  @Output() ClickValue:EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private authService:AuthService,private chatService:ChatService) { }
  
  ngOnInit(): void {
    this.authService.getUser().subscribe(data => {
      this.senderId = data._id

      this.chatService.lastchat(this.user._id).subscribe(data => {
        // console.log(data)
        if(data.error){
          this.lastmsg = {message: ""}
          this.clicked = true
        }
        else if (data.chats){
          this.lastmsg = data.chats
          // console.log('LASTMSG: ',this.lastmsg.chats)
          if(this.lastmsg.sender == this.senderId){
            this.clicked = true
          }else if(this.lastmsg.sender != this.senderId && !this.lastmsg.hasRead){
            this.clicked = false
          }else{
            this.clicked = true
          }
        }
      })

      this.chatService.listen('receive-msg').subscribe(data => {
        // console.log(data)
        if(data){
          this.lastmsg = data.chats
        }
      })
    })
  }

  onUserClick(userId:string,name:string){
    this.chatService.hasRead(this.lastmsg._id).subscribe(data => {
      if(data.success){
        this.clicked = true
      }
    })
    this.clickeduser = {
      userId: userId,
      name: name
    }
    this.userClickEvent.emit(JSON.stringify(this.clickeduser))
    this.ClickValue.emit(this.clicked)
  }

}
