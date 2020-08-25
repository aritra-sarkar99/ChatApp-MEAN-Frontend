import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http'
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket:any;
  readonly url:string = 'http://localhost:3000/'
  constructor(private http:HttpClient) { 
    this.socket = io(this.url);
  }

  listen(eventName: string){
    return new Observable<any>((subscriber)=> {
      this.socket.on(eventName,data => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName,data);
  }

  getchat(receiverId:string):Observable<any>{
    const api = this.url + 'api/getchat/' + receiverId
    return this.http.get<any>(api)
  }

  lastchat(userId:string):Observable<any>{
    const api = this.url + 'api/lastchat/' + userId
    return this.http.get<any>(api)
  }

  hasRead(msgId:string):Observable<any>{
    const api = this.url + 'api/hasRead/' + msgId
    return this.http.get<any>(api)
  }
}
