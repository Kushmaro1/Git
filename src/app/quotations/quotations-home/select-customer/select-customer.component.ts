import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/translator/class/globals.service';
import { QuotationsService } from '../../quotations.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.less']
})
export class SelectCustomerComponent implements OnInit, OnDestroy {
  @Input()  selected:string;
  @Output() selectedCustomer = new EventEmitter<any>(); 

  _destroy$: any;
  customerTableForm: FormGroup;
  // limits=[
  //   "10","25","50","100"
  // ]
  categories=[
    "Production Company", "Student Production","Camera Man","Lighting","Grip",
    "Sound","Assistant Producer","Supplier"
  ]
  subscribtions=[]
  public tableStructure = {
    tableName:'Customers Table',
    print:true,
    // email:'sendAllEmail',
    rowsperpage: 7,
    // editable:{ 'phone': true},
    searchable:[],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon:{
      'Select':true,
      // "View":true,
      // "Email":true,
     },
     buttonIconClass:{

      "Select":"fas fa-check",
      
     },
    buttons: {
     
      "Select": "selectCustomer",
    },
    aliaces: {
      'company_id':"ID",
      'id':"#",
      'full_name': "Full Name",
      'phone': "Phone",
      'email': "Email",
      
    },
    headers: [
      'id',
      'full_name',
      'company_id',
      'phone',
      'email'
    ],
    eclipsis:{
      company_id : true,
      full_name : true,
      phone : true,
      email : true,
     
    },
  };
  public tableData = [

   
  ];
  public instance: SelectCustomerComponent;
  public myStyle={
    actionsMenu:{
      'min-width':'calc(4vw)',
      // 'max-width':'calc(4vw)',
      // 'overflow':'hidden',
      // 'text-overflow': 'ellipsis',
      // 'white-space': 'nowrap',
    },
    cell:{
      'company_id':{
        'min-width':'calc(4vw)',
        'max-width':'calc(4vw)',
        'overflow':'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      'full_name':{
        'min-width':'calc(7vw)',
        'max-width':'calc(7vw)',
        'overflow':'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      'phone':{
        'min-width':'calc(5vw)',
        'max-width':'calc(5vw)',
        'overflow':'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      'email':{
        'min-width':'calc(7vw)',
        'max-width':'calc(7vw)',
        'overflow':'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      
    },
    "View":{
      // "background-image":'url(../../../../assets/images/linked2.svg)',
      // "background-repeat":"no-repeat",
      // 'background-position': 'center',
      // 'background-size' : 'contain',
      // 'background-clip': 'border-box',
      // 'background-color': 'transparent',
      // 'color':'blue',
      // 'text-align':'center'
      // "transform":"translate(0%,10%)",
      // 'color':'grey',
      'color':'var(--element10, #4098FE)'
    },
    "ViewHover":{
      'color':'var(--element3hover, #75E5BE)',
      // 'text-shadow': '0px 1px 1px rgba(0, 0, 0, 0.8)',
    }
    // "table":{"color":this.colorT}
    
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public glob : Globals,
    public qs :QuotationsService
  ) {
    this.instance = this;
   }

  ngOnInit() {
    this.customerTableForm = this.fb.group({
      category: [''],
      searchCustomers: [''],
    });
    this.subscribtions.push({})
    this.subscribtions[this.subscribtions.length-1] =this.qs.sock.customersUpdate.subscribe(data=>{
        // this.searchClients(); 
    })
    this.subscribtions.push({})
     this.subscribtions[this.subscribtions.length-1] =this.qs.sock.dataLoaded.subscribe(data=>{
      if(data == 'customers'){
        this.searchClients();
      }
      })
      this.searchClients();

      this.filteredStreets = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  searchClients() {
    let category = this.qs.categoriesCusMap.get(this.customerTableForm.value['category'])
    let tableData = [];
    this.tableData = []
    if(category){
      tableData = this.qs.sock.allClients.get(category) || [];
    }else{
      tableData = this.qs.getAllClientsArray() || [];
    }
    let searchCustomers = this.customerTableForm.value['searchCustomers'].toLowerCase();
    if(searchCustomers == ''){
      for(let i=0;i<tableData.length;i++){
           if(tableData[i]['id'] != this.selected){
             this.tableData.push(tableData[i])
           }else{
            //  console.log(this.selected)
           }
      }
      this.tableData = JSON.parse(JSON.stringify(this.tableData))
    }else{
      
      for(let i=0;i<tableData.length;i++){
        if((''+tableData[i]['company_id']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['id']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['full_name']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['phone']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['email']).toLowerCase().indexOf(searchCustomers) > -1){
           if(tableData[i]['id'] != this.selected){
             this.tableData.push(tableData[i])
           }else{
            // console.log(this.selected)
          }
        }
      }
      this.tableData = JSON.parse(JSON.stringify(this.tableData))
    }

  }

  selectCustomer(buttonName,row){
    this.selectedCustomer.emit(row['id'])
    // if(row['email']){
    //   window.location.href = "mailto:"+row['email'];
    // }
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChanges}) {  
 
    for (let propName in changes) {
        if(propName=='selected' && this.customerTableForm){
          console.log(this.selected)
          this.searchClients()
        }
    }
  }
  ngOnDestroy() {
    for(let i=0;i<this.subscribtions.length;i++){
      this.subscribtions[i].unsubscribe()
    }
  }

  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;
  
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
