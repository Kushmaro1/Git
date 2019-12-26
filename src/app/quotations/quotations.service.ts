import { Injectable, EventEmitter } from '@angular/core';

import { MessagesService } from '../shared/sevices/messages.service';
import { SocketService } from '../socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { http, RestURL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  bidData = []
  start = 0;
  end = 100;
  categoriesCusMap = new Map();

  categoriesMap = new Map();
  mahlakotMap = new Map();
  mahlakotReverseMap = new Map();
  categoriesMapReverse = new Map();
  // allClients = new Map();
  categoriesCusMapReverse = new Map();
  paymentMap = new Map();
  paymentMapReverse = new Map();
  public sliceLoaded: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private httpClient: HttpClient,  
    public messs:MessagesService,
    public sock:SocketService
  ) { 
    this.categoriesCusMap = new Map();
    this.categoriesCusMapReverse = new Map();
    this.paymentMap = new Map();
    this.paymentMapReverse = new Map();

    this.categoriesMap = new Map();
    this.categoriesMapReverse = new Map();
      this.categoriesCusMap.set('Production Company',1);
      this.categoriesCusMap.set('Student Production',2);
      this.categoriesCusMap.set('Camera Man',3);
      this.categoriesCusMap.set('Lighting',4);
      this.categoriesCusMap.set('Grip',5);
      this.categoriesCusMap.set('Sound',6);
      this.categoriesCusMap.set('Assistant Producer',7);
      this.categoriesCusMap.set('Supplier',8);
      this.categoriesCusMapReverse.set(1,'Production Company');
      this.categoriesCusMapReverse.set(2,'Student Production');
      this.categoriesCusMapReverse.set(3,'Camera Man');
      this.categoriesCusMapReverse.set(4,'Lighting');
      this.categoriesCusMapReverse.set(5,'Grip');
      this.categoriesCusMapReverse.set(6,'Sound');
      this.categoriesCusMapReverse.set(7,'Assistant Producer');
      this.categoriesCusMapReverse.set(8,'Supplier');
      this.paymentMap.set('Immediate',1);
      this.paymentMap.set('Credit 30',2);
      this.paymentMap.set('Credit 60',3);
      this.paymentMap.set('Credit 90',4);
      this.paymentMapReverse.set(1,'Immediate');
      this.paymentMapReverse.set(2,'Credit 30');
      this.paymentMapReverse.set(3,'Credit 60');
      this.paymentMapReverse.set(4,'Credit 90');

  this.categoriesMap.set('Camera',1);
  this.categoriesMap.set('Tripod + Stabilizers',2);
  this.categoriesMap.set('Media',3);
  this.categoriesMap.set('Power/Batteries',4);
  this.categoriesMap.set('Lenses',5);
  this.categoriesMap.set('Monitors',6);
  this.categoriesMap.set('Box Set + Filters',7);
  this.categoriesMap.set('Camera Equipment Accessories',8);
  this.categoriesMap.set('Wireless Camera',9);
  this.categoriesMap.set('Flashlights 5600',10);
  this.categoriesMap.set('Flashlights 3200',11);
  this.categoriesMap.set('Kino Flashlight',12);
  this.categoriesMap.set('LED Flashlight/Special Flashlight',13);
  this.categoriesMap.set('Stends',14);
  this.categoriesMap.set('Flags and Frames',15);
  this.categoriesMap.set('Electrical Power',16);
  this.categoriesMap.set('Lighting Fixtures & Grips',17);
  this.categoriesMap.set('Other Lighting',18);
  this.categoriesMap.set('DOLLY and Products',19);
  this.categoriesMap.set('Gabe and Products',20);
  this.categoriesMap.set('Grip Accessories',21);
  this.categoriesMap.set('Mixer and Recording Equipment',22);
  this.categoriesMap.set('Sound Systems',23);
  this.categoriesMap.set('Wireless',24);
  this.categoriesMap.set('Microphones and Accessories',25);
  this.categoriesMap.set('Other Sound',26);
  this.categoriesMap.set('Camp Equipment',27);
  this.categoriesMap.set('Generator + Vehicles',28);
  this.categoriesMap.set(29, 'Raw materials and consumables');
  this.categoriesMapReverse.set(1,'Camera');
  this.categoriesMapReverse.set(2,'Tripod + Stabilizers');
  this.categoriesMapReverse.set(3,'Media');
  this.categoriesMapReverse.set(4,'Power/Batteries');
  this.categoriesMapReverse.set(5,'Lenses');
  this.categoriesMapReverse.set(6,'Monitors');
  this.categoriesMapReverse.set(7,'Box Set + Filters');
  this.categoriesMapReverse.set(8,'Camera Equipment Accessories');
  this.categoriesMapReverse.set(9,'Wireless Camera');
  this.categoriesMapReverse.set(10,'Flashlights 5600');
  this.categoriesMapReverse.set(11,'Flashlights 3200');
  this.categoriesMapReverse.set(12,'Kino Flashlight');
  this.categoriesMapReverse.set(13,'LED Flashlight/Special Flashlight');
  this.categoriesMapReverse.set(14,'Stends');
  this.categoriesMapReverse.set(15,'Flags and Frames');
  this.categoriesMapReverse.set(16,'Electrical Power');
  this.categoriesMapReverse.set(17,'Lighting Fixtures & Grips');
  this.categoriesMapReverse.set(18,'Other Lighting');
  this.categoriesMapReverse.set(19,'DOLLY and Products');
  this.categoriesMapReverse.set(20,'Gabe and Products');
  this.categoriesMapReverse.set(21,'Grip Accessories');
  this.categoriesMapReverse.set(22,'Mixer and Recording Equipment');
  this.categoriesMapReverse.set(23,'Sound Systems');
  this.categoriesMapReverse.set(24,'Wireless');
  this.categoriesMapReverse.set(25,'Microphones and Accessories');
  this.categoriesMapReverse.set(26,'Other Sound');
  this.categoriesMapReverse.set(27,'Camp Equipment');
  this.categoriesMapReverse.set(28,'Generator + Vehicles');
  this.mahlakotMap.set(0,'One Man Show')
  this.mahlakotMap.set(1,'Camera')
  this.mahlakotMap.set(2,'Light')
  this.mahlakotMap.set(3,'Grip')
  this.mahlakotMap.set(4,'Sound')
  this.mahlakotMap.set(5,'Camp')
  this.mahlakotMap.set(6,'Production')
  this.mahlakotReverseMap.set('One Man Show',0);
  this.mahlakotReverseMap.set('Cameras',1);
  this.mahlakotReverseMap.set('Light',2);
  this.mahlakotReverseMap.set('Grip',3);
  this.mahlakotReverseMap.set('Sound',4);
  this.mahlakotReverseMap.set('Camp',5);
  this.mahlakotReverseMap.set('Production',6);
  }
  getAllClientsArray() {
    let iterator1 = this.sock.allClients.keys();
    let myValue=iterator1.next().value;
    let allClientsArray = []
    for(let k=0;myValue != undefined;k++){
      // console.log(this.sock.allClients.get(myValue))
      allClientsArray = allClientsArray.concat(this.sock.allClients.get(myValue))
      myValue=iterator1.next().value
    }
    return allClientsArray;
  }
  
  getBidsSlice(start, end){
    if(this.sock.bidCount == 0){
      return;
    }
    if(this.bidData.length && start>=this.start && end<=this.end){
        let slice = this.bidData.slice(start - this.start,end - this.start)
        this.sliceLoaded.emit({data:slice})
    }else{
       if(this.sock.bidCount >= end){
         this.getBidSlice(start, start + 100).subscribe(data=>{
           if(data.response_code<500){
             this.bidData = JSON.parse(JSON.stringify(data.data))
             this.start = start;
             this.end = start + 100;
             let slice = this.bidData.slice(start - this.start,end - this.start)
             this.sliceLoaded.emit({data:slice})
           }else{
            this.setMessage ('', 'Server Error',{error:true}); 
           }
         })
       }else{
        this.getBidSlice(start, this.sock.bidCount).subscribe(data=>{
          if(data.response_code<500){
            this.bidData = JSON.parse(JSON.stringify(data.data))
            this.start = start;
            this.end = end;
            let slice = this.bidData.slice(start - this.start,end - this.start)
            this.sliceLoaded.emit({data:slice})
          }else{
           this.setMessage ('', 'Server Error',{error:true}); 
          }
        })
       }

    }
  }
  getBidSlice(start, end): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/bid/get/paging/'+start+'/'+end);
  }
  setMessage (header, body, style = null , time = 2000) {
    this.messs.setMessage (header, body, style , time); 
  }
  getClient(id): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/client/get/' + id);
  }
 
  creatyeBid(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL  + 'api/bid/create', payload);
  }
  
}
