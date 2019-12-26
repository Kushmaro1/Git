import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  id = 0
  public setSubNav: EventEmitter<any> = new EventEmitter<any>();
  public messageAllert: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  setMessage (header, body, style = null , time = 2000)  {
    this.id++;
    this.messageAllert.emit({
      header:header,
      body:body,
      style : style ? style : {error:false},
      type:true,
      id:this.id
    })
    if(time != null){
      let id = this.id
      setTimeout(this.removeMessage.bind(this,id), time);
    }

    if(this.id>1000000){
      this.id=0;
    }

  }
  removeMessage(id){
    console.log(id)
    this.messageAllert.emit({
      header:null,
      body:null,
      style:null,
      type:false,
      id:id
    })
  }
}
