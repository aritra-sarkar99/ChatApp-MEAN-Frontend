import { Injectable, Injector } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import {User} from '../models/User'
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:3000/api/'
  private isAuthSub = new Subject<boolean>()
  // isAuth = this.isAuthSub.asObservable()

  constructor(private http:HttpClient, private router:Router) {

   }

  login(user:User):Observable<any>{
    const api = this.url + 'signin'
     return this.http.post<any>(api,user,httpOptions)
  }

  signup(user:User):Observable<any>{
    const api = this.url + 'signup'
    return this.http.post<any>(api,user,httpOptions) 
  }

  getUser():Observable<any>{
    const api = this.url + 'getuser'
     return this.http.get<any>(api)
  }

  getUserList():Observable<any>{
    const api = this.url + '/getuserlist'
    return this.http.get<any>(api)
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('isAuth')
    this.router.navigate(['login'])
  }

  setAuth(boolvalue:boolean){
    this.isAuthSub.next(boolvalue)
  }

  getAuth(){
    return this.isAuthSub.asObservable()
  }

}
