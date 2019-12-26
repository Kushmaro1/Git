import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../shared/sevices/messages.service';
import { Observable } from 'rxjs';
import { http, RestURL } from '../shared/constants';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  categoriesMap = new Map();
  categoriesMapReverse = new Map();
  // public dataLoaded: EventEmitter<any> = new EventEmitter<any>();
  selectedProduct = {};
  constructor(
    private httpClient: HttpClient,
    public messs: MessagesService,
    public sock: SocketService
  ) {
  }
  start() {

    this.categoriesMap.set('Camera', 1);
    this.categoriesMap.set('Tripod + Stabilizers', 2);
    this.categoriesMap.set('Media', 3);
    this.categoriesMap.set('Power/Batteries', 4);
    this.categoriesMap.set('Lenses', 5);
    this.categoriesMap.set('Monitors', 6);
    this.categoriesMap.set('Box Set + Filters', 7);
    this.categoriesMap.set('Camera Equipment Accessories', 8);
    this.categoriesMap.set('Wireless Camera', 9);
    this.categoriesMap.set('Flashlights 5600', 10);
    this.categoriesMap.set('Flashlights 3200', 11);
    this.categoriesMap.set('Kino Flashlight', 12);
    this.categoriesMap.set('LED Flashlight/Special Flashlight', 13);
    this.categoriesMap.set('Stends', 14);
    this.categoriesMap.set('Flags and Frames', 15);
    this.categoriesMap.set('Electrical Power', 16);
    this.categoriesMap.set('Lighting Fixtures & Grips', 17);
    this.categoriesMap.set('Other Lighting', 18);
    this.categoriesMap.set('DOLLY and Products', 19);
    this.categoriesMap.set('Gabe and Products', 20);
    this.categoriesMap.set('Grip Accessories', 21);
    this.categoriesMap.set('Mixer and Recording Equipment', 22);
    this.categoriesMap.set('Sound Systems', 23);
    this.categoriesMap.set('Wireless', 24);
    this.categoriesMap.set('Microphones and Accessories', 25);
    this.categoriesMap.set('Other Sound', 26);
    this.categoriesMap.set('Camp Equipment', 27);
    this.categoriesMap.set('Generator + Vehicles', 28);
    this.categoriesMap.set('Raw materials and consumables', 29);
    this.categoriesMapReverse.set(1, 'Camera');
    this.categoriesMapReverse.set(2, 'Tripod + Stabilizers');
    this.categoriesMapReverse.set(3, 'Media');
    this.categoriesMapReverse.set(4, 'Power/Batteries');
    this.categoriesMapReverse.set(5, 'Lenses');
    this.categoriesMapReverse.set(6, 'Monitors');
    this.categoriesMapReverse.set(7, 'Box Set + Filters');
    this.categoriesMapReverse.set(8, 'Camera Equipment Accessories');
    this.categoriesMapReverse.set(9, 'Wireless Camera');
    this.categoriesMapReverse.set(10, 'Flashlights 5600');
    this.categoriesMapReverse.set(11, 'Flashlights 3200');
    this.categoriesMapReverse.set(12, 'Kino Flashlight');
    this.categoriesMapReverse.set(13, 'LED Flashlight/Special Flashlight');
    this.categoriesMapReverse.set(14, 'Stends');
    this.categoriesMapReverse.set(15, 'Flags and Frames');
    this.categoriesMapReverse.set(16, 'Electrical Power');
    this.categoriesMapReverse.set(17, 'Lighting Fixtures & Grips');
    this.categoriesMapReverse.set(18, 'Other Lighting');
    this.categoriesMapReverse.set(19, 'DOLLY and Products');
    this.categoriesMapReverse.set(20, 'Gabe and Products');
    this.categoriesMapReverse.set(21, 'Grip Accessories');
    this.categoriesMapReverse.set(22, 'Mixer and Recording Equipment');
    this.categoriesMapReverse.set(23, 'Sound Systems');
    this.categoriesMapReverse.set(24, 'Wireless');
    this.categoriesMapReverse.set(25, 'Microphones and Accessories');
    this.categoriesMapReverse.set(26, 'Other Sound');
    this.categoriesMapReverse.set(27, 'Camp Equipment');
    this.categoriesMapReverse.set(28, 'Generator + Vehicles'); 
    this.categoriesMapReverse.set(29, 'Raw materials and consumables');

    // this.getAllProducts().subscribe(data=>{
    //   if(data.response_code < 500){
    //     this.sock.allProducts = JSON.parse(JSON.stringify(data.data))
    //     this.dataLoaded.emit(true)
    //   } else{
    //     this.setMessage ('', 'Server Error',{error:true}); 
    //   }
    // })
  }
  selectProduct(id) {
    if (this.selectedProduct['id'] == id) {
      return;
    }
    for (let i = 0; i < this.sock.allProducts.length; i++) {
      if (this.sock.allProducts[i]['id'] == id) {
        this.selectedProduct = JSON.parse(JSON.stringify(this.sock.allProducts[i]))
        return
      }
    }
  }
  myDeleteChildProduct(id, product_id) {
    for (let i = 0; i < this.sock.allProducts.length; i++) {
      if (this.sock.allProducts[i]['id'] == product_id) {
        let stock = this.sock.allProducts[i].stock - 1;
        this.sock.allProducts[i].stock = stock;
        //  this.selectedProduct = JSON.parse(JSON.stringify(this.sock.allProducts[i]))
        for (let k = 0; k < this.sock.allProducts[i]['children'].length; k++) {
          if (this.sock.allProducts[i]['children'][k]['id'] == id) {
            if (this.sock.allProducts[i]['id'] == this.selectedProduct['id']) {
              this.selectedProduct['children'].splice(k, 1)
            }
            this.sock.allProducts[i]['children'].splice(k, 1)
          }
        };
        let mess = {}
        mess['action'] = 'products';
        mess['type'] = 'deleteChild';
        mess['data'] = { id, product_id, stock };
        this.sock.publishAction(mess)
        return;
      }
    }
  }
  myCreateChildProduct(id, serial_number, parent_id) {
    for (let i = 0; i < this.sock.allProducts.length; i++) {
      if (this.sock.allProducts[i]['id'] == parent_id) {
        this.selectedProduct['children'].push({
          id,
          serial_number
        });
        this.sock.allProducts[i]['total'] += 1;
        this.sock.allProducts[i]['children'].push({
          id,
          serial_number
        });
        let mess = {}
        mess['action'] = 'products';
        mess['type'] = 'createChild';
        mess['data'] = { id, serial_number, parent_id };
        this.sock.publishAction(mess)
        return;
      }
    }
  }
  deleteMyProduct(id) {
    for (let i = 0; i < this.sock.allProducts.length; i++) {
      if (this.sock.allProducts[i]['id'] == id) {
        this.sock.allProducts.splice(i, 1);
        let mess = {}
        mess['action'] = 'products';
        mess['type'] = 'delete';
        mess['data'] = id;
        this.sock.publishAction(mess)
        return;
      }
    }
  }
  editParentProduct(parentPayload) {
    for (let i = 0; i < this.sock.allProducts.length; i++) {
      if (this.sock.allProducts[i]['id'] == parentPayload['id']) {
        this.sock.allProducts[i] = JSON.parse(JSON.stringify(parentPayload))
        let mess = {}
        mess['action'] = 'products';
        mess['type'] = 'edit';
        mess['data'] = parentPayload;
        this.sock.publishAction(mess)
        return;
      }
    }
  }
  newParentProduct(parentPayload) {
    this.sock.allProducts.push(parentPayload)
    let mess = {}
    mess['action'] = 'products';
    mess['type'] = 'create';
    mess['data'] = parentPayload;
    this.sock.publishAction(mess)
  }
  searchForAutoComplete(name) {
    let autoComplete = []
    for (let i = 0; i < this.sock.allProducts.length; i++) {
      if (this.sock.allProducts[i]['name'].toLowerCase().indexOf(name.toLowerCase()) == 0) {
        autoComplete.push({ name: this.sock.allProducts[i]['name'], id: this.sock.allProducts[i]['id'] })
      }
    }
    return autoComplete;
  }
  renewProduct(id) {
    this.getParentProductsById(id).subscribe(data => {
      if (data.response_code < 500) {
        let json = JSON.parse(JSON.stringify(data.data));
        for (let i = 0; i < this.sock.allProducts.length; i++) {
          if (this.sock.allProducts[i]['id'] == json['id']) {
            this.sock.allProducts[i] = JSON.parse(JSON.stringify(json))
          }
        }
      } else {
        this.setMessage('', 'Server Error', { error: true });
      }
    })
  }

  deleteProduct(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/parent/delete/product', payload);
  }
  deleteImage(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + '/api/child/delete/image', payload);
  }
  deleteDocument(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/child/delete/document', payload);
  }
  deleteChildProduct(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/child/delete/product', payload);
  }
  updateProduct(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/parent/update/product', payload);
  }
  updateChildProduct(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/child/update/product', payload);
  }
  updateProductAdditionaItems(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/parent/update/additional/parent', payload);
  }
  createProduct(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/parent/create/product', payload);
  }
  createDocument(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/child/create/document', payload);
  }
  createImage(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/child/create/image', payload);
  }
  createChildProduct(payload): Observable<any> {
    return this.httpClient.post<any>(http + RestURL + 'api/child/create/product', payload);
  }
  addChildProductRemark(payload): Observable<any> {
    payload["remark_type"] = 2;
    return this.httpClient.post<any>(http + RestURL + 'api/create/remark', payload);
  }
  getParentProductAvilablity(payload): Observable<any> {
  
    console.log(payload);
    return this.httpClient.post<any>(http + RestURL + 'api/parent/get/product/avilablity', payload);
  }

  getParentProductsById(id): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/parent/get/product/id/' + id);
  }
  getChildProductsById(id): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/child/get/product/id/' + id);
  }
  getChildProductRemarks(id, type = 2): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/get/remarks/' + type + '/' + id);
  }
  getChildProductImages(id): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/child/get/images/id/' + id);
  }
  getChildProductDocuments(id): Observable<any> {
    return this.httpClient.get<any>(http + RestURL + 'api/child/get/documents/id/' + id);
  }
  setMessage(header, body, style = null, time = 2000) {
    const file = body !== 'Success' ? "assets/sound/beepError.mp3" : "assets/sound/Success.mp3";
    let audio = new Audio(file);
    audio.play();
    this.messs.setMessage(header, body, style, time);
  }

}