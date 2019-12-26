import {
  Injectable, EventEmitter
} from '@angular/core';
import {
  HttpClient,
  HttpRequest
} from '@angular/common/http';
import {
  Observable, Subject
} from 'rxjs';
import {
  RestURL,http
} from '../constants';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import jsSHA from '../../../assets/js/sha.js';
import { Router, ActivatedRoute, ResolveEnd } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // UID ="";
  // UPK = ""
  // userData=[];
  // rules=new Map();
  // roles=[]
  // canActivate = {}
  public logoutEmitter: EventEmitter<any> = new EventEmitter<any>();
   isLogged=false;
  private token = ''
  public userName = ''
  public permission = ''
  // operationMap=new Map();
  constructor(private router: Router,private httpClient: HttpClient,private route: ActivatedRoute) {
 
   }
  //  getMaps(){
  //    this.getOperation().subscribe( data=>{
  //     if(data.response_code==1192){
  //       for(let i=0;i<data.description[0][1].length;i++){
  //          this.operationMap.set(data.description[0][1][i]['url'],data.description[0][1][i]['operation_id'])
  //       }
  //      //  // console.log(this.operationMap)
  //     }
  //   })
  //  }
  _userActionOccured: Subject<void> = new Subject();
  get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };

  notifyUserAction() {
    this._userActionOccured.next();
  }


  setTocken(token){
    if(this.token == ''){
      this.token = token;
    }
  }
  getSignature(){
    return this.token;
  }
        isLoggedIn(){
          if(this.token != "" && this.isLogged){
            return true;
          }
          return false;
        }
        // isModuleAccessible(module){
        //   if(this.rules.size){
        //     return true;
        //   }
        //   return true;
        // }
        // checkRequest(url,method){
        //   if(url){
        //    return true;
        //    }
        //   if(url.indexOf(nbiURL) == 0){
        //     return true;
        //   }
        //   if(url.indexOf(BackOfficeURL)==0){
            
        //     // console.log(method)
        //     // console.log(url)
        //     let newstr = url.replace(BackOfficeURL, '');
        //     let urlArr=newstr.split('/')
        //     // console.log(urlArr)
        //     for(let i=urlArr.length-1;i>=0;i--){
        //       let str=''
        //       for(let k=0;k<=i;k++){
        //         str+='/'+urlArr[k]
        //       }
        //     // console.log(str)
        //    //  // console.log(this.operationMap)
        //       if(this.operationMap.has(str)){
        //         // console.log(this.rules)
        //         if(this.rules.has(''+this.operationMap.get(str))){
        //           let perm=this.rules.get(''+this.operationMap.get(str))
        //           // console.log(this.rules)
        //           // console.log('found url',str,'op_id:',this.operationMap.get(str),'perm:',JSON.stringify(perm),'method',method)
        //           perm['parameters'][method]
        //           return perm['parameters'][method] == true ? true : false;
        //         }
        //         else{
        //           // console.log('found url',str,'op_id:',this.operationMap.get(str),'perm:','none')
        //           return false;
        //         }
        //         //break;
        //       }
             
        //     }
        //    // console.log(url)
        //   }
        //   return true;
      
        // }
        // getOperation(): Observable < any > {
        //   return this.httpClient.get < any > (BackOfficeURL + 'admin/operations');
        // }
        // getSignature():any{
        //   let signature = "AUTH" + new Date().getTime()
        //   let hmacObj = new jsSHA("SHA-384", "TEXT");
        //   hmacObj.setHMACKey(this.UPK, "B64");
        //   hmacObj.update(signature);
        //   let signed = hmacObj.getHMAC("B64");
        //   let myobj={
        //       signed:signed,
        //       signature:signature

        //   } 
        //   return myobj;
        // }
        // startFidoAuthentication(): Observable<any>{
        //   return this.httpClient.get<any>(BackOfficeURL +'admin/fido/startAuthentication');
        // }
        // finishFidoAuthentication(payload): Observable<any>{
        //   return this.httpClient.post<any>(BackOfficeURL +'admin/fido/finishAuthentication',payload);
        // }
        // startAuthenticationProcess(route,data){
        //   if(this.canActivate[route] == true || this.canActivate[route] == false){
        //     return true;
        //   }
        //   if(data.fido){
        //    // this.startFidoAuth(route)
        //     return new Promise<boolean>(function(resolve, reject){
        //       this.startFidoAuthentication().subscribe(data=> {  
        //         if(data){
        //             let data2=data; 
        //             console.log(data)
        //             // console.log('Data after  startAuthenticationProcess(){ here : ',data);
        //             u2fApi.sign( data2.signRequests )
        //             .then(
        //               // sendDataTo(data,route){
        //                 this.finishFidoAuthentication(data).subscribe(data => {
        //                   console.log(data)
        //                      if(data.description == "FIDO_AUTH_FINISH"){
        //                        this.canActivate[route] = true;
        //                        resolve(true)
        //                       //  this.router.navigate[route]
        //                      }else{
        //                        this.canActivate[route] = false;
        //                        reject(false)
        //                      }
                           
        //               //  });
        //               // this.sendDataTo.bind(data,route,this)
        //             // );
        //               }))
        //             }else{
        //               reject(false)
        //             }
        //       });  
        //     });
        //   }  
        // }
        // startFidoAuth(route){
          
        // }
        // getFirstName(){
        //   return this.userData[0] ? this.userData[0].first_name : '';
        // }
        // sendDataTo(data,route){
        //  return this.finishFidoAuthentication(data).subscribe(data => {
        //       if(data.description == "FIDO_AUTH_FINISH"){
        //         this.canActivate[route] = true;
        //         this.router.navigate[route]
        //       }else{
        //         this.canActivate[route] = false;
        //       }
            
        // });
        // }
        logout(){
          sessionStorage.removeItem('pass');
          // this.getLoggedOut().subscribe(data=>{
          //    console.log(data)
          //   if(data.response_code == 153){
          //     this.UID ="";
          //     this.UPK = ""
          //     this.userData=[];
          //     this.rules=new Map();
          //     this.roles=[]
          //     this.canActivate = {}
          //     this.isLogged=false;
          //     this.router.navigate(['../'],{ relativeTo: this.route.root });
          //     // window.location.reload();
          //   }
          // })
          this.isLogged=false;
          this.token = '';
          this.userName = '';
          this.permission = '';
          this.logoutEmitter.emit(true)
          this.router.navigate(['../'],{ relativeTo: this.route.root });
        }
        getLoggedOut(): Observable<any> {
          return this.httpClient.put<any>(http+RestURL + 'user/logout', '');
        }
}