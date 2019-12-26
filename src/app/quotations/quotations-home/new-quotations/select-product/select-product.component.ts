import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/translator/class/globals.service';
import { QuotationsService } from '../../../quotations.service';
import { SocketService } from 'src/app/socket/socket.service';
import { Observable, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DayCountPipe } from '../../../day-count.pipe';
import { Product } from '../Product-object'
import {ProductsService} from 'src/app//products/products.service'

@Component({
  selector: ' tr[app-select-product]',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.less'],
  providers: [DayCountPipe]
})
export class SelectProductComponent implements OnInit, OnDestroy {


  @Input() dateObj: any;
  @Input() indeX: number;
  @Output() productEvent = new EventEmitter<Product>();




  products = [];
  prodForm = new FormControl();
  filterPoducts: Observable<string[]>;
  productObj: Product;
  dates = []

  productTotalPrice: number;
  productQuantity = 0;
  productdays: number;
  discount: number;
  productDays: number;
  productPricAftrdisc: number;
 

  isProdAvilabl =false;

  remarks = []
  myStyle = {
    label: {
      'width': '100%',
      'margin-top': '5px',
      'margin-bottom': '10px',
      'display': 'inline-block',
      'min-height': 'fit-content',
    },
    i: {
      'margin': '2px 5px'
    }
  }

  buttonIconClass: {
    "Delete": "fas fa-trash-alt",
    "Duplicate": "fas fa-copy",
    "Add Entry": "fas fa-plus-circle",

  }


  dateId = 0;
  proDateId = 0;
  tableDateId = 0;
  daysChanged = false;
  categories = [
    'Camera',
    'Tripod + Stabilizers',
    'Media',
    'Power/Batteries',
    'Lenses',
    'Monitors',
    'Box Set + Filters',
    'Camera Equipment Accessories',
    'Wireless Camera',
    'Flashlights 5600',
    'Flashlights 3200',
    'Kino Flashlight',
    'LED Flashlight/Special Flashlight',
    'Stends',
    'Flags and Frames',
    'Electrical Power',
    'Lighting Fixtures & Grips',
    'Other Lighting',
    'DOLLY and Products',
    'Gabe and Products',
    'Grip Accessories',
    'Mixer and Recording Equipment',
    'Sound Systems',
    'Wireless',
    'Microphones and Accessories',
    'Other Sound',
    'Camp Equipment',
    'Generator + Vehicles',
  ]


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public glob: Globals,
    public qs: QuotationsService,
    private sook: SocketService,
    private dayCount: DayCountPipe,
    private prodServ: ProductsService
  ) {

  }

  ngOnInit() {
    this.getProductsList();


    this.dateInit();

    console.log(this.dateObj)
  }

  ngOnDestroy(): void {
  }

  getDatesFromParent() {

  }

  //--Product date 
  dateInit() {

    this.dates = [];
    for (let i = 0; i < this.dateObj.length; i++) {
      this.dates.push({
        dateId: this.indeX.toString() + this.dateId,
        date_to: this.dateObj[i].date_to,
        date_from: this.dateObj.date_from,
        num_d: this.dateObj[i].num_d,
        date_range: this.dateObj[i].date_range
      })
      this.dateId++;
    }
    console.log(this.dates);
  }
  newDateInput(e) {
    for (let i = 0; i < this.dates.length; i++) {
      console.log(this.dates[i]['dateId'])
      if (this.dates[i]['dateId'] == e['id']) {
        this.dates[i]['date_to'] = e['date_to'];
        this.dates[i]['date_from'] = e['date_from'];
        this.dates[i]['num_d'] = e['num_d'];
        this.dates[i]['date_range'] = e['date_from'] + '_' + e['date_to'];

        break;
      }
    }
    if (e['id'] == this.indeX.toString() + (this.dateId - 1)) {
      this.dates.push({
        dateId: this.indeX.toString() + this.dateId,
        date_range: ''
      })
      this.dateId++;
    }
    //console.log(this.dates)
    this.daysChanged = !this.daysChanged;
  }


  removeDate(i) {
    this.dates.splice(i, 1)
    this.daysChanged = !this.daysChanged;
  }
  addRemark(e) {
    let t = new Date().getTime()
    //console.log(e)
    this.remarks.unshift({ text: e.remark, timestamp: t })
  }


  //--product items



  getProductsList() {

    this.sook.getAllProducts().subscribe(prod => {
      console.log(prod);
      prod.data.forEach(elem => {
        let jsonData = {};
        jsonData['ID'] = elem.id;
        jsonData['Name'] = elem.name;
        jsonData['Price'] = elem.price;
        this.products.push(jsonData);
      });
    })
    //console.log(this.products)
    this.filterPoducts = this.prodForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterP(value))
    );
  }

  private _filterP(value: any): string[] {
    let filterValue;
    if (typeof (value) !== 'object') {
      filterValue = value.toLowerCase();
    }
    else {
      filterValue = value['Name'].toLowerCase();
    }

    return this.products.filter(prod => this._normalizeValue(prod.Name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  setProductitem(val) {
debugger
    const selectedObj = this.products.filter(prodc => prodc.ID == val.value.ID);

    const Name = selectedObj[0].Name;
    const ID = selectedObj[0].ID;
    const Price = selectedObj[0].Price;
    let datsToObj = []

    for (let i = 0; i < this.dates.length; i++) {
      if (this.dates[i].date_to != undefined) {
        datsToObj.push({
          from_date: this.dates[i].date_from,
          to_date: this.dates[i].date_to,
        })
      }

    }

    this.productObj = new Product(ID,
      this.productQuantity,
      datsToObj,
      Price,
      this.discount,
      this.productPricAftrdisc,
      false,
      false
    );

      const avbprod = {
        parent_id:ID,
        dates:datsToObj
      }

      this.prodServ.getParentProductAvilablity(avbprod).subscribe( result => {
      this.isProdAvilabl = (result.data.total <= this.productQuantity )
        console.log(result.data.total >= this.productQuantity)
        console.log(result.data.total);

     })

    this.productEvent.emit(this.productObj);

  }


  displayFn(obj: any): string {
    return obj ? obj.Name : obj;
  }

  //--product items -- End

  //--product price 


  getProductTotalPrice() {
    let price = 0;
    this.productDays = parseInt(this.dayCount.transform(this.dates, true).replace(': ', ''));
    
    price = (this.productObj['productPrice'] * this.productQuantity) * this.productDays;
    if (this.discount > 0) {
      const disc = this.discount / 100;
      this.productTotalPrice = price - (price * disc);

      this.productPricAftrdisc = this.productObj['productPrice'] - (this.productObj['productPrice'] * disc);
    }
    else {
      this.productTotalPrice = price;
    }
    console.log(this.productTotalPrice)
  }


  setDiscount() {

  }
  
  



}



/*
0:
id: " M8"
name: "בלסט M8"
category: 18
price: 0
description: ""
parent_type: "basic"
is_disabled: 0
warn_on_discount: null
category_name: "תאורה אחר"
additional_parent_items: []
accessories: []
total: 3
available: 3
children: Array(3)
0: {id: "000000014026", serial_number: "081173217"}
1: {id: "000000014071", serial_number: "081145516"}
2: {id: "000000014075", serial_number: "081151116"}
length: 3
__proto__: Array(0)
__proto__: Object

*/



    /* 
     dateId: "00"
date_to: "2019/12/20"
date_from: "2019/12/05"
num_d: 16
date_range: "2019/12/05_2019/12/20"

      {"from_date":"2019-12-01" , "to_date":"2019-12-12"},
			{"from_date":"2019-12-12" , "to_date":"2019-12-20" }


      productTotalPrice: number;
      productQuantity: number;
      productdays: number;
      discount: number;
      productDays: number;
      productPricAftrdisc: number;
    
       private productId: number,
       private amount: number,
       private dates:[],
       private price:number,
       private perUnitDiscount:number,
       private priceAfterDiscount:number,
       private isDivient:boolean,
       private isOutsource:boolean
    
    */