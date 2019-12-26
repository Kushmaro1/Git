import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../../../translator/class/globals.service';
import { CustomerService } from '../../customer.service';
@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.less']
})
export class CustomersTableComponent implements OnInit, OnDestroy {
  _destroy$: any;
  customerTableForm: FormGroup;
  limits=[
    "10","25","50","100"
  ]
  categories=[
    "Production Company", "Student Production","Camera Man","Lighting","Grip",
    "Sound","Assistant Producer","Supplier"
  ]
  subscribtions=[]
  public tableStructure = {
    tableName:'Customers Table',
    print:true,
    email:'sendAllEmail',
    rowsperpage: 10,
    // editable:{ 'phone': true},
    searchable:[],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon:{
      'Edit':true,
      "View":true,
      "Email":true,
     },
     buttonIconClass:{
      "View":"fas fa-eye",
      "Edit":"fas fa-user-edit",
      "Email":"fas fa-at",
     },
    buttons: {
      "View": "viewCustomer",
      "Edit": "editCustomer",
      "Email": "emailCustomer",
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
  public instance: CustomersTableComponent;
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
    public cs :CustomerService
  ) {
    this.instance = this;
   }

  ngOnInit() {
    this.cs.messs.setSubNav.emit('Customers Table'); 
    this.customerTableForm = this.fb.group({
      category: [''],
      searchCustomers: [''],
    });
    this.subscribtions.push({})
    this.subscribtions[this.subscribtions.length-1] =this.cs.sock.customersUpdate.subscribe(data=>{
        // this.searchClients(); 
    })
    this.subscribtions.push({})
     this.subscribtions[this.subscribtions.length-1] =this.cs.sock.dataLoaded.subscribe(data=>{
      if(data == 'customers'){
        this.searchClients();
      }
      })
      this.searchClients();
  }

  searchClients() {
    let category = this.cs.categoriesMap.get(this.customerTableForm.value['category'])
    let tableData = [];
    if(category){
      tableData = this.cs.sock.allClients.get(category) || [];
    }else{
      tableData = this.cs.getAllClientsArray() || [];
    }
    let searchCustomers = this.customerTableForm.value['searchCustomers'].toLowerCase();
    if(searchCustomers == ''){
      this.tableData = JSON.parse(JSON.stringify(tableData))
    }else{
      this.tableData = []
      for(let i=0;i<tableData.length;i++){
        if((''+tableData[i]['company_id']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['id']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['full_name']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['phone']).toLowerCase().indexOf(searchCustomers) > -1 || (''+tableData[i]['email']).toLowerCase().indexOf(searchCustomers) > -1){
           this.tableData.push(tableData[i])
        }
      }
      this.tableData = JSON.parse(JSON.stringify(this.tableData))
    }

  }
  viewCustomer(buttonName,row){
    this.router.navigate(['../main/customers/view/' + row['id']]);
  }
  editCustomer(buttonName,row){
    this.router.navigate(['../main/customers/edit/' + row['id']]);
  }
  emailCustomer(buttonName,row){
    if(row['email']){
      window.location.href = "mailto:"+row['email'];
    }
  }
  addNew(){
    this.router.navigate(['../main/customers/add/' + 'new']);
  }
  sendAllEmail(){
    let str = "mailto:";
    for(let i=0;i<this.tableData.length;i++){
      if(this.tableData[i]['email']){
        str+=';'+this.tableData[i]['email'];
      }
    }
    window.location.href = str;
  }
  ngOnDestroy() {
    for(let i=0;i<this.subscribtions.length;i++){
      this.subscribtions[i].unsubscribe()
    }
  }

}
