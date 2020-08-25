import { Component, OnInit, Input } from '@angular/core';
import {ChatService} from '../services/chat.service'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() clickedUser:any;
  @Input() clickValue:boolean;
  senderId:string;
  personA:string
  personB:string
  // selectedUser:string;
  fetchedmsg:any;
  currentmsgs:any[] = [];
  sendmsg:string;
  receivemsg:string;

  samemsg:boolean = false
  constructor(private chatService:ChatService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => {
      this.senderId = data._id
    })

    this.chatService.listen('receive-msg').subscribe(data => {
      // console.log('RECEIVE-MSG: ',data)
      this.personA = data.personA
      this.personB = data.personB
      this.currentmsgs.push(data.chats)
    })
    
  }

  setUser(eventdata:string){
    this.currentmsgs = []
    this.fetchedmsg = []
    this.clickedUser = JSON.parse(eventdata)
    // console.log(this.clickedUser.name)
    if(this.clickedUser.userId){
      this.chatService.getchat(this.clickedUser.userId).subscribe(data => {
        // console.log('LAST CHAT: ',data)
        if(data){
          this.personA = data.personA
          this.personB = data.personB
          this.fetchedmsg = data
          if((this.currentmsgs.length > 0) && (this.fetchedmsg.chats[this.fetchedmsg.chats.length-1].message == this.currentmsgs[this.currentmsgs.length-1].message)){
          this.currentmsgs = []
        }
        }
      })
    }
  }

  setClickValue(eventdata:boolean){
    this.clickValue = eventdata
  }

  sendMsg(sendmsg:string){
      // const temp = {
      //   send: true,
      //   message: sendmsg
      // }
      // this.currentmsgs.push(temp)
  }

}
