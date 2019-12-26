import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ViewChild, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/translator/class/globals.service';
import { QuotationsService } from '../../quotations.service';
import { Observable, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SocketService } from '../../../socket/socket.service';
import { BidObject } from './bid-object'
import { SelectProductComponent } from './select-product/select-product.component'
import { Product } from './Product-object'
@Component({
  selector: 'app-new-quotations',
  templateUrl: './new-quotations.component.html',
  styleUrls: ['./new-quotations.component.less']
})
export class NewQuotationsComponent implements OnInit, AfterContentInit {


  @ViewChild(SelectProductComponent) proComp: SelectProductComponent;

  ngAfterContentInit(): void {

  }
  ngAfterViewInit() {

  }


  bidForm = new FormControl();
  prodForm = new FormControl();
  clients = [];
  productsItems = [''];
  product :Product;

  filteredOptions: Observable<string[]>;
  filteredStreets: Observable<string[]>;
  allClientsArray;
  bidObject: BidObject;

  priceBeforeDiscount = 0;
  discount = 0;
  priceAfterDiscount = 0;

  projectName: string;
  producerName: string;
  producerEmail: string;
  status = [
    {
      name: 'New', val: 1
    },
    {
      name: 'Approved', val: 2
    },
    {
      name: 'Canceled', val: 3
    },
  ]
  bidStat: number;

  department = 0;
  bidSchedule: [];

  productArry = [];



  receiveProductObj($event) {
    this.productArry.push($event)
    console.log(this.productArry)
  }

  bidObj = {}


  isbidObj = false;

  dates: Array<any>;



  dateId = 0;
  proDateId = 0;
  tableDateId = 0;
  daysChanged = false;


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
  prodIndex: 0;



  constructor(public qs: QuotationsService,
    private sook: SocketService) { }

  ngOnInit() {

    this.isbidObj = Object.entries(this.bidObj).length === 0 && this.bidObj.constructor === Object;
    //console.log(this.isbidObj)
    let el = document.getElementById('myRemarkChild');
    this.setClaientArry();

    this.filteredOptions = this.bidForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dateInit();
  }


  dateInit() {
    this.dates = [];

    this.dates.push({
      dateId: 'd' + this.dateId
    })

    this.dateId++;

  }

  displayFn(obj: any): string {
    return obj ? obj.Name : obj;
  }


  setDetails(val) {
    const selctedClient = this.allClientsArray.filter(cle => cle.id == val.value.ID);
    console.log(selctedClient);
    this.bidObj['Name'] = selctedClient[0].full_name;
    this.bidObj['ID'] = selctedClient[0].company_id;
    this.bidObj['Phone'] = selctedClient[0].phone;
    this.bidObj['Mail'] = selctedClient[0].email;

    this.isbidObj = Object.entries(this.bidObj).length === 0 && this.bidObj.constructor === Object;
  }


  setClaientObject() {

    this.bidObject = new BidObject(
      this.bidObj['ID'],
      this.priceBeforeDiscount,
      this.discount,
      this.priceAfterDiscount,
      this.projectName,
      this.producerName,
      this.producerEmail,
      this.department,
      this.bidStat,
      this.dates,
      this.bidSchedule
    );
    console.log(this.bidObject);

  }



  setClaientArry() {
    this.allClientsArray = this.qs.getAllClientsArray();
    this.allClientsArray.forEach(elem => {
      let jsonData = {};
      jsonData['ID'] = elem.id;
      jsonData['Name'] = elem.full_name;
      this.clients.push(jsonData);
    });

  }


  addRemark(e) {
    let t = new Date().getTime()
    //console.log(e)
    this.remarks.unshift({ text: e.remark, timestamp: t })
  }
  newDateInput(e) {
    for (let i = 0; i < this.dates.length; i++) {
      if (this.dates[i]['dateId'] == e['id']) {
        this.dates[i]['date_to'] = e['date_to']
        this.dates[i]['date_from'] = e['date_from']
        this.dates[i]['num_d'] = e['num_d']
        this.dates[i]['date_range'] = e['date_from'] + '_' + e['date_to']

        break;
      }
    }
    if (e['id'] == 'd' + (this.dateId - 1)) {

      this.dates.push({
        dateId: 'd' + this.dateId,
        date_range: ''
      })
      this.dateId++;
    }
    //console.log(this.dates)
    this.daysChanged = !this.daysChanged;
    this.proComp.dateInit();
  }


  removeDate(i) {
    this.dates.splice(i, 1)
    this.daysChanged = !this.daysChanged;
  }


  bidCancelation() {
    this.bidObj = {};
    this.isbidObj = true;
  }



  private _filter(value: any): string[] {
    let filterValue;
    if (typeof (value) !== 'object') {
      filterValue = value.toLowerCase();
    }
    else {
      filterValue = value['Name'].toLowerCase();
    }
    return this.clients.filter(option => option.Name.toLowerCase().includes(filterValue));
  }


  selectedstat(e) {
    this.bidStat = e.value;
  }

  addproductitem(i) {
    this.prodIndex = i;
    this.productsItems.splice(i, 0, '');
  }

  removeproductitem(i) {
    this.productsItems.splice(i, 1);
  }

}


/*
 private clientId:number,
 private priceBeforeDiscount:number,
 private discount:number,
 private priceAfterDiscount:number,
 private projectName:string,
 private producerName:string,
 private producerEmail:string,
 private department:number,
 private destatus:number,
 private dates:[],
 private bidSchedule:[],

 id: 27
compy_id: "200674851"
full_name: "דניאל זרביב"
phone: "0547640557"
email: "dannyzerbib@gmail.com"
client_category: 1
*/




