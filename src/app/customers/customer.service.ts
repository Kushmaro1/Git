import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { http, RestURL,ws,  SocketURL } from '../shared/constants';
import { MessagesService } from '../shared/sevices/messages.service';
// import { SocketService } from '../socket/socket.service';
// import SockJS from '../../assets/js/sockjs.min.js'
// import * as EventBus from './v-sock.js';
import { SocketService } from '../socket/socket.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public newEntry: EventEmitter<any> = new EventEmitter<any>();
  public editedEntry: EventEmitter<any> = new EventEmitter<any>();
 
  categoriesMap = new Map();
  // allClients = new Map();
  categoriesMapReverse = new Map();
  paymentMap = new Map();
  // publicSocket=null
  paymentMapReverse = new Map();
  constructor(
    private httpClient: HttpClient,  
    public messs:MessagesService,
    public sock:SocketService
    ) {
   
    
    // let eventBus = EventBus.EventBus('http://212.115.111.209/eventbus');
    // eventBus.onopen = function () {
    //     eventBus.registerHandler('auction.' + 21, function (error, message) {
    //        console.log(message)
    //     });
    // }
    // this.sock.allClients.set(1,[]);
    
  }
  start(){
    this.categoriesMap = new Map();
    this.categoriesMapReverse = new Map();
    this.paymentMap = new Map();
    this.paymentMapReverse = new Map();
      this.categoriesMap.set('Production Company',1);
      this.categoriesMap.set('Student Production',2);
      this.categoriesMap.set('Camera Man',3);
      this.categoriesMap.set('Lighting',4);
      this.categoriesMap.set('Grip',5);
      this.categoriesMap.set('Sound',6);
      this.categoriesMap.set('Assistant Producer',7);
      this.categoriesMap.set('Supplier',8);
      this.categoriesMapReverse.set(1,'Production Company');
      this.categoriesMapReverse.set(2,'Student Production');
      this.categoriesMapReverse.set(3,'Camera Man');
      this.categoriesMapReverse.set(4,'Lighting');
      this.categoriesMapReverse.set(5,'Grip');
      this.categoriesMapReverse.set(6,'Sound');
      this.categoriesMapReverse.set(7,'Assistant Producer');
      this.categoriesMapReverse.set(8,'Supplier');
      this.paymentMap.set('Immediate',1);
      this.paymentMap.set('Credit 30',2);
      this.paymentMap.set('Credit 60',3);
      this.paymentMap.set('Credit 90',4);
      this.paymentMapReverse.set(1,'Immediate');
      this.paymentMapReverse.set(2,'Credit 30');
      this.paymentMapReverse.set(3,'Credit 60');
      this.paymentMapReverse.set(4,'Credit 90');
  
      // this.openSocket()
      // this.getSocket().subscribe(data=>{
        // this.sock.buildHeaders(); 
        // this.sock.connect(); 
      // })
    
   
  }
  // ngOnDestroy(): void {
  //   this.sock.disconnect(); 
  // }
  getAllClientsArray(){
    let iterator1 = this.sock.allClients.keys();
    let myValue=iterator1.next().value;
    let allClientsArray = []
    for(let k=0;myValue != undefined;k++){
      // console.log(this.sock.allClients.get(myValue))
      allClientsArray = allClientsArray.concat(this.sock.allClients.get(myValue))
      myValue=iterator1.next().value
    }
    // console.log(allClientsArray)
    return allClientsArray;
  }
  editClient(data){
    let arr = this.sock.allClients.get(data['client_category']);
    for(let i=0;i<arr.length;i++){
      if(arr[i]['id'] == data['id']){
        let mess={}
        mess['action'] = 'customers';
        mess['type'] = 'edit';
        mess['data'] = data;
        this.sock.publishAction(mess)
        this.sock.allClients.get(data['client_category'])[i] = JSON.parse(JSON.stringify(data));
        return;
      }
    }
    
  }
  newClient(data){
    // console.log(data)
    if(this.sock.allClients.has(data['client_category'])){
      this.sock.allClients.get(data['client_category']).push(data);
    }else{
      this.sock.allClients.set(data['client_category'],[]);
      this.sock.allClients.get(data['client_category']).push(data);
    }
    let mess={}
    mess['action'] = 'customers';
    mess['type'] = 'new';
    mess['data'] = data;
    this.sock.publishAction(mess)
  }
  
  // {
  //   "full_name" :"bgelse",
  //   "email" : "other@mail.com",
  //   "id" : "112354444",
  //   "company_id" : "112354444",
  //   "client_category" : 1,
  //   "payment_method" :1,
  //   "phone" : "0542222255",
  //   "streat_addres" : "addrsfnn",
  //   "city" : "dakml.n",
  //   "area_code" : "1425",
  //   "country" : "thisones",
  //   "contacts":[
  //         {
  //           "full_name":"anotherone",
  //           "phone": "0541235",
  //           "email":"my@mail.com",
  //           "job":"executor"
  //         },
  //         {
            
  //           "full_name":"ano ther one",
  //           "phone": "021235",
  //           "email":"myaaa@mail.com",
  //           "job":"executodsar"
  //         }
  //         ],
  //   "remarks":["comment1","another comment","some Tests"]
        
  // }
  createClient(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL  + 'api/client/create', payload);
  }

  // {
  //   "id":1,
  //   "full_name" :"bgelse",
  //   "email" : "other@mail.com",
  //   "company_id" : "112354444",
  //   "client_category" : 1,
  //   "payment_method" :1,
  //   "phone" : "0542222255",
  //   "streat_addres" : "addrsfnn",
  //   "city" : "dakml.n",
  //   "area_code" : "1425",
  //   "country" : "thisones"
        
  // }
  updateClient(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL  + 'api/client/update', payload);
  }

  // {
  //   "contact_id":1,
  //   "client_id":1
  // }
  deleteContact(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL  + 'api/client/delete/contacts', payload);
  }
  // {
  //   "client_id":6,
  //     "contacts":[
  //         {
  //           "id": 3,
  //           "full_name":"updated",
  //           "phone": "0541111",
  //           "email":"mail@mail.com",
  //           "job":"some"
  //         },
  //         {
  //           "id": 2,
  //           "full_name":"I have been updated",
  //           "phone": "021235",
  //           "email":"no@mail.com",
  //           "job":"all"
  //         }
  //         ]
    
  // }
  updateContacts(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL  + 'api/client/update/contacts', payload);
  }

  getClient(id): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/client/get/' + id);
  }
  // getSocket(): Observable<any> {
  //   return this.httpClient.get<any>('http://212.115.111.209/eventbus/info');
  // }

  setMessage (header, body, style = null , time = 2000) {
    this.messs.setMessage (header, body, style , time); 
  }
  openSocket(){
    // this.publicSocket = new WebSocket(ws + SocketURL);
    // this.publicSocket = new SockJS(http + SocketURL);
    //   console.log(this.publicSocket);
      
    //   this.publicSocket.addEventListener('open', (event) => {
       
    //     let connMes = {
    //       "type": "ping",
    //     }
    //     console.log(connMes)
    //     this.publicSocket.send(JSON.stringify(connMes));
    //     this.publicSocket.send(JSON.stringify({"type":"register","address":"auction.1","headers":{}}));
    //     setInterval(()=>{
    //       this.publicSocket.send(JSON.stringify(connMes));

    //     },5000)

    //   });

    //   this.publicSocket.addEventListener('message', (event) => {

    //    console.log(event)
    //   });
     
    //   this.publicSocket.addEventListener('close', (event) => {
        
    //    console.log(event)
    //   });
  }
}
