// import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable,EMPTY  } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { RestURL,http,ws,SocketURL } from '../constants';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.auth.isLoggedIn()){
      if(req.url.toLowerCase().indexOf((http+RestURL).toLowerCase())==0 || req.url.toLowerCase().indexOf((ws+SocketURL).toLowerCase())==0){
        if(req.url.toLowerCase().indexOf(('eventbus').toLowerCase())>-1 ){
          console.log(req )
         const authReq = req.clone({
           headers: req.headers.set('Authorization',this.auth.getSignature()).set('Access-Control-Allow-Origin','*').set( 'Access-Control-Allow-Credentials','true')
          });
          return next.handle(authReq);
       }else{

         const authReq = req.clone({
           headers: req.headers.set('Authorization',this.auth.getSignature()).set('Access-Control-Allow-Origin','*')
          });
          return next.handle(authReq);
       }
      }
      // if(req.url.toLowerCase().indexOf((ws+SocketURL).toLowerCase())==0){
      //   const authReq = req.clone({
      //     headers: req.headers.set('UID',this.auth.UID).set('signature_plain', obj['signature']).set('signature_encrypted',obj['signed'])
      //    });
      //    return next.handle(authReq);
      // }
      // const authReq = req.clone({
      // });
      // return next.handle(authReq)  
      return EMPTY;
    }
    else{
      const authReq = req.clone({     
      });
      return next.handle(authReq)
    }
  }

}