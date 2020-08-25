import {HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http'
import { Injectable } from '@angular/core'

import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private auth:AuthService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler ){
        const authtoken = localStorage.getItem('token')
        const authReq = req.clone({
            headers: req.headers.set('Authorization',"Bearer " + authtoken)
        });
        return next.handle(authReq)
    }
}