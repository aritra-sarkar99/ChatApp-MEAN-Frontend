import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ChatService} from '../services/chat.service'

import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @Input() clickeduser:any;
  @Output() SendEvent:EventEmitter<string> = new EventEmitter<string>()
  senderId:string = ''
  chatinput = ''
  message = {
    senderId:'',
    receiverId:'',
    text:''
  }
  constructor(private chatService:ChatService,private authservice:AuthService) { }

  ngOnInit(): void {
    this.authservice.getUser().subscribe(data => {
      this.senderId = data._id
    })
  }

  send(){
    this.message.receiverId = this.clickeduser.userId
    this.message.senderId = this.senderId
    this.chatService.emit('send msg',this.message);
    this.SendEvent.emit(this.chatinput)
  }

  handleSubmit(event){
    if(event.keyCode===13){
      this.message.text = this.chatinput
      this.send()
      this.chatinput = ''
    }
  }

}
