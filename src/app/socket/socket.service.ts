import { EventEmitter,Injectable } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { AuthService } from '../shared/sevices/auth.service';
import { SocketURL, ws, http, RestURL } from '../shared/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../shared/sevices/messages.service';

@Injectable({providedIn:'root'})
export class  SocketService {
    eventBusURL =http+ SocketURL;
    allClients = new Map();
    allProducts=[];
    clientsLoaded = false;
    productssLoaded = false;
    public dataLoaded: EventEmitter<any> = new EventEmitter<any>();
    public customersUpdate: EventEmitter<any> = new EventEmitter<any>();
    // messages  = [];
    // channelMessage : {} ;
    // commertialMessage = [];
  //  channelLIst = [];
    // id
    opened
    instance=false
    // index=1;
    // channel_id
    // repeat=1
    // conversation_id=''
    reconnectAttempt=true
    headers = {}
    reconnect = true
    // callData
    reconnectInterval=10000
    // history:  EventEmitter<any> = new EventEmitter<any>();
    // call : EventEmitter<any> = new EventEmitter<any>();
    // public newClient: EventEmitter<any> = new EventEmitter<any>();
    // public queSize: EventEmitter<any> = new EventEmitter<any>();
    // public messageFromClient: EventEmitter<any> = new EventEmitter<any>();
    // public conversations: EventEmitter<any> = new EventEmitter<any>();
    // public BONotification: EventEmitter<any> = new EventEmitter<any>();
    // public closeTicket: EventEmitter<any> = new EventEmitter<any>();
    window=1;
    bidCount=0;
    bidLoaded: boolean = false;
    constructor(
        public eventBusService: EventBusService,
        public auth: AuthService,
        private httpClient: HttpClient, 
        public messs:MessagesService, 
    ) {
        let path = window.location.origin;
        // console.log(path)
        if(window.location.origin.indexOf('http://localhost') != -1){

        }
        else{
            // if(window.location.origin.indexOf('bitzonex') > -1){
                // let arr=path.split('.')
                // this.eventBusURL=''
                // this.eventBusURL='https://back-office-soc'+'.'+arr[1]+'.'+arr[2];
               // console.log(this.eventBusURL)
            // }
            // else{
            //     this.eventBusURL=''
            //     let arr=path.split(':')
            //     this.eventBusURL=arr[0]+':'+arr[1]+':8080';
            // }

        }
        this.auth.logoutEmitter.subscribe(data=>{
            if(data){
                this.disconnect();
            }else{

            }
        })
        // get current path, for ex: '/index.php', '/docs/pdf/detail.php'
        //  // console.log(pathName); // for ex: '/index.php'=>'/', '/docs/pdf/detail.php'=>'/docs/pdf/'
        // this.webRTC.emitCall.subscribe(data=>{
        //       // console.log(data.descr)
        //       this.callData=data.descr;
        //       // console.log(data.id)
        // })
        // this.webRTC.open.subscribe(data=>{
        //     // console.log(data)
        //       if(data==true){
        //           //make call available
        //         this.webRTC.callPeer(this.conversation_id)
        //       }
        // })
        // this.connect()
     }
     renewClients(){
        this.getAllClients().subscribe(data=>{
            if(data.response_code < 500){
              this.allClients = new Map();
              // console.log(data)
              for(let i=0;i<data.data.length;i++){
                if(this.allClients.has(data.data[i]['client_category'])){
                  this.allClients.get(data.data[i]['client_category']).push(data.data[i]);
                }
                else{
                  this.allClients.set(data.data[i]['client_category'],[]);
                  this.allClients.get(data.data[i]['client_category']).push(data.data[i]);
                }
              }
              console.log(this.allClients)
              this.dataLoaded.emit('customers')
              this.clientsLoaded = true;
              // this.setMessage ('', 'Customers Loaded');
             
            }else{
              this.setMessage ('', 'Server Error',{error:true});
            }
          })
     }
     renewProducts(){
          this.getAllProducts().subscribe(data=>{
              if(data.response_code < 500){
                this.allProducts = JSON.parse(JSON.stringify(data.data))
                console.log(this.allProducts)
                this.dataLoaded.emit('products')
                this.productssLoaded = true;
              } else{
                this.setMessage ('', 'Server Error',{error:true}); 
              }
            })
     }
     renewBid(){
          this.getBidCount().subscribe(data=>{
              if(data.response_code < 500){
                this.bidCount = Number(data.data['count']);
                // this.allProducts = JSON.parse(JSON.stringify(data.data))
                this.dataLoaded.emit('quotations')
                this.bidLoaded = true;
              } else{
                this.setMessage ('', 'Server Error',{error:true}); 
              }
            })
     }
     setMessage (header, body, style = null , time = 2000) {
        this.messs.setMessage (header, body, style , time); 
      }
     getAllClients(): Observable<any> {
        return this.httpClient.get<any>(http + RestURL + 'api/client/get/all');
      }
      getAllProducts(): Observable<any> {
        return this.httpClient.get<any>(http + RestURL + 'api/parent/get/product/all');
      }
      getBidCount(): Observable<any> {
        return this.httpClient.get<any>(http + RestURL + 'api/bid/get/count');
      }
    connect() {
        this.instance=true;
        // this.start();
        if (!this.enabled) {
            console.debug('AppEventBusService.connect - Disabled ');
        }
        // Subscribe to close event
        this.eventBusService.close.subscribe(() => {
            console.log('close')
            this.clientsLoaded = false;
            this.productssLoaded = false;
            this.bidLoaded = false;
            this.opened=false
            if(this.reconnect){
                    // console.log('AppEventBusService will attempt to reconnect in'+' '+(this.reconnectInterval/1000)+'sec');
                    setTimeout(() => {
                        // console.log('AppEventBusService.connect ' + this.eventBusURL);
                        this.eventBusService.connect(this.eventBusURL, this.headers,{vertxbus_ping_interval:this.reconnectInterval});
                        this.reconnectAttempt=false;
                    }, this.reconnectInterval);
            }
        });
        // Subscribe to open event
        this.eventBusService.open.subscribe(() => {
            console.log('open')
            this.reconnectAttempt=true;
            this.renewClients();
            this.renewProducts();
            this.renewBid();
            // console.log('AppEventBusService.open');
            this.opened=true
            // let d=new Date();
            // let obj={
            //       message:'',
            //       image:'',
            //       date:d.toUTCString(),
            //       user_id:this.id*1,
            //       message_id:'',
            //       status:100
            //     };
            //   this.publishAction(obj,'credentials');
              this.eventBusService.registerHandler('auction.10',(error,message)=>{
                    // ;
                    console.log(message)
              })
        });
        // Subscribe to message event
        this.eventBusService.message.subscribe((e) => {
            // console.log(e)
            // console.log('AppEventBusService.message:',e);
            this.onmessage(JSON.parse(e.data));
        });
        // Connec
        // console.log('AppEventBusService.connect ' + this.eventBusURL);
        this.eventBusService.connect(this.eventBusURL, this.headers);
    }
    disconnect() {
        this.eventBusService.disconnect();
       
    }

    get connected(): boolean {
        return this.eventBusService.connected;
    }

    get enabled(): boolean {
        return (this.eventBusURL!== '');
    }

    setReConnect(status:boolean){
        this.reconnect=status;
    }

    publishAction(message) {
        if (!this.enabled) {
            return;
        }
        this.eventBusService.publish('auction.10', message)
    }

   
    /**
     *
     * @param eventBusAddress
     */
    // unsubscribeFromActions(eventBusAddress: string) {
    //     if (!this.enabled) return;
    //     this.eventBusService.unregister(eventBusAddress);
    // }
    onmessage(message: any) {
    //  console.log(message.message)
        if(!message.message.data){
          return
        }else{
          
        }
        switch(message.message.action){
            case 'products' :{
              switch(message.message.type){
                case 'deleteChild':{
                  for(let i=0;i<this.allProducts.length;i++){
                    if(this.allProducts[i]['id'] == message.message.data.product_id){
                       this.allProducts[i].stock = message.message.data.stock;
                       for(let k=0;k<this.allProducts[i]['children'].length; k++){
                          if(this.allProducts[i]['children'][k]['id'] == message.message.data.id){                   
                            this.allProducts[i]['children'].splice(k,1)
                          }
                       };
                       return;
                    }
                  }
                  break;
                }
                case 'createChild':{
                  for(let i=0;i<this.allProducts.length;i++){
                    if(this.allProducts[i]['id'] == message.message.data.parent_id){   
                      console.log(this.allProducts[i])
                            this.allProducts[i]['total'] +=1;
                            this.allProducts[i]['children'].push({
                             id:message.message.data.id,
                             serial_number:message.message.data.serial_number
                            });
                       return;
                    }
                  }
                  break;
                }
                case 'delete':{
                  for(let i=0;i<this.allProducts.length;i++){
                    if(this.allProducts[i]['id'] == message.message.data.id){
                      this.allProducts.splice(i,1);
                      return;
                    }
                  }
                  break;
                }
                case 'edit':{
                  for(let i=0;i<this.allProducts.length;i++){
                    if(this.allProducts[i]['id'] == message.message.data.data['id']){
                      this.allProducts[i] = JSON.parse(JSON.stringify(message.message.data.data))            
                      return;
                    }
                  }
                  break;
                }
                case 'create':{
                  this.allProducts.push(message.message.data.parentPayload)
                  break;
                }
              }
               // this.productsUpdate.emit(message)
              break;
            }
            case 'customers' :{
              switch(message.message.type){
                case 'edit':{
                  let arr = this.allClients.get(message.message.data['client_category']);
                  for(let i=0;i<arr.length;i++){
                    if(arr[i]['id'] == message.message.data['id']){
                      this.allClients.get(message.message.data['client_category'])[i] = JSON.parse(JSON.stringify(message.message.data));
                      return;
                    }
                  }
                  break;
                }
                case 'new':{
                  if(this.allClients.has(message.message.data['client_category'])){
                    this.allClients.get(message.message.data['client_category']).push(message.message.data);
                  }else{
                    this.allClients.set(message.message.data['client_category'],[]);
                    this.allClients.get(message.message.data['client_category']).push(message.message.data);
                  }
                  break;
                }
              }
              this.customersUpdate.emit(true)
              break;
            }
            // case 'support_ready' :{
            //     // console.log(message)
            //     // this.conversation_id=message.conversation_id;
            //   break;
            // }
            // case 'publish' : {
            //     if(message.message_id){
            //         let update=1;
            //         for(let i=0;i<this.messages.length;i++){
            //             if(this.messages[i].message_id==message.message_id){
            //                 this.messages[i].status=this.messages[i].status+1;
            //                 update--;
            //             }
            //         }
            //         if(update){
            //             this.messages.push(message.body);
            //         }
            //     }
            //     break;
            // }
            // case 'emit' : {
            //     // if(this.channel_id>0){
            //     //   if(message.to==this.channel_id){
            //     //     this.channelMessage[this.channel_id]=[];
            //     //     this.channelMessage[this.channel_id].push(message.body)
            //     //     this.messageToChannel.emit(message.body);
            //     //   }

            //     // }
            //     // else{

            //     // }
            //     // console.log(message)
            //     break;
            //  }
            // case 'channels_list' : {
            // //    this.channelLIst=[];
            // //    this.channelLIst=message.channels;
            // //    this.channels.emit(message.channels);
            //     break;
            // }
            // case 'subscribe_to_channel' : {
            // //    this.channel_id=message.to*1;
            // //    this.newChannelId.emit(this.channel_id);
            //    break;
            // }
            // case 'history' : {
            //     this.history.emit(message);
            //     break;
            //  }
            // case 'support_bo_user_conversations' : {
            //     this.conversations.emit(message);
            //     break;
            // }
        }

    }
    // emitAction(id){
    //     // console.log(this.id)
    //     // console.log(id)
    //  if(this.window){
    //     this.window--; 
    //      window.requestAnimationFrame(this.mySend.bind(this))
    //  }   


    // }
    // mySend(){
    //     this.window++; 
    //     // for(let i=0;i<100;i++){
    //     let d=new Date();
    //     let obj1={
    //           message:'message to 21'+(this.index++),
    //           image:'',
    //           date:d.toUTCString(),
    //           user_id:this.id,
    //           message_id:'',
    //           status:100
    //     };
    //     let obj2={
    //         message:'message to 22'+(this.index++),
    //         image:'',
    //         date:d.toUTCString(),
    //         user_id:this.id,
    //         message_id:'',
    //         status:100
    //   };
    //   let obj3={
    //     message:'message to 23'+(this.index++),
    //     image:'',
    //     date:d.toUTCString(),
    //     user_id:this.id,
    //     message_id:'',
    //     status:100
    // };
    //     // this.publishAction(obj1,'emit','21');
    //     // this.publishAction(obj2,'emit','22');
    //     this.publishAction(obj3,'emit','23');
    // // }
    //     if(this.repeat){
    //         this.repeat--;
    //         window.requestAnimationFrame(this.mySend.bind(this))
    //     }
    // }
    // PRIVATE
    public buildHeaders() {
        // this.id=parseInt(this.auth.UID,10);
        // TODO Authentication header
        let obj={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'HEAD, OPTIONS, GET,PUT, POST, DELETE, PATCH',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Authorization':this.auth.getSignature()
        }
        // obj['UID']=parseInt(this.auth.UID,10);
        // obj['UPK']=pk;
        // obj['UTP']=3;
        this.headers = JSON.parse(JSON.stringify(obj));
    }

}
