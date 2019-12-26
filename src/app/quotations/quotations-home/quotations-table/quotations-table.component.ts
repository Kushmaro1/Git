import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../../../translator/class/globals.service';
import { QuotationsService } from '../../quotations.service';

@Component({
  selector: 'app-quotations-table',
  templateUrl: './quotations-table.component.html',
  styleUrls: ['./quotations-table.component.less']
})
export class QuotationsTableComponent implements OnInit, OnDestroy {

  subscribtions=[]
  public tableStructure = {
    tableName:'Customers Table',
    print:true,
    // email:'sendAllEmail',
    rowsperpage: 10,
    scroll:'scrollTable',
    total:80,
    // editable:[],
    searchable:[],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon:{
      'Edit':true,
      "View":true,
      "Delete":true,
      "PDF":true,
     },
     buttonIconClass:{
      "View":"fas fa-eye",
      "Edit":"fas fa-user-edit",
      "Delete":"fas fa-trash-alt",
      "PDF":"fas fa-file-pdf"
     },
    buttons: {
      "View": "viewQuotation",
      "Edit": "editCustomer",
      "Delete": "emailCustomer",
      "PDF": "printQuotation"
    },
    aliaces: {
      'id':"#",
      'from_date': "From",
      'to_date': "To",
      'status_name': "Status",
      'project_name': "Project Name",
      'price_after_discount': "Total Price",
      'full_name': "Full Name",
      'client_id':"ID",
    },
    headers: [
      'id',
      'status_name',
      'price_after_discount',
      'from_date',
      'to_date',
      'project_name',
      'full_name',
      'client_id',
    ],

    eclipsis:{
      company_id : true,
      full_name : true,
      from_date : true,
      to_date : true,
     
    },
  };
  public tableData = [

  ];
  public instance: QuotationsTableComponent;
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
      'from_date':{
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
      'to_date':{
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
  quotationsTableForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public glob : Globals,
    public qs:QuotationsService
  ) {
    this.instance = this;
    
   }

  ngOnInit() {
    this.subscribtions.push({})
    this.subscribtions[this.subscribtions.length-1] =this.qs.sock.dataLoaded.subscribe(data=>{
      if(data == 'quotations'){
       this.tableStructure['total'] = this.qs.sock.bidCount;
        this.searchQuotations();
      }
     })
    this.qs.sock.renewBid();
    this.tableStructure['total'] =this.qs.sock.bidCount;
    this.subscribtions.push({})
    this.subscribtions[this.subscribtions.length-1] =this.qs.sliceLoaded.subscribe(data=>{
      // this.qs.sock.renewBid();
      this.tableStructure['total'] =this.qs.sock.bidCount;
      let tableData = JSON.parse(JSON.stringify(data));
      for(let i = 0;i<tableData.length;i++){
        tableData[i]['from_date'] = ''
        tableData[i]['to_date'] = ''
        for(let k = 0;k<tableData[i]['bid_dates'].length;k++){
          tableData[i]['from_date'] += tableData[i]['bid_dates'][k]['from_date'] + '; ';
          tableData[i]['to_date'] += tableData[i]['bid_dates'][k]['to_date'] + '; ';
        }
      }

      this.tableData = JSON.parse(JSON.stringify(tableData))
    })
    this.qs.messs.setSubNav.emit('Quotations Table'); 
    this.quotationsTableForm = this.fb.group({
      searchQuotations: [''],
      date_from:[''],
      date_to:[''],
      project_name:['']
    });
   
      this.searchQuotations();
  }
  scrollTable(start,end){
    this.qs.getBidsSlice(start,end);
  }
  searchQuotations(){
   
    
  }
  addNew(){
    this.router.navigate(['../main/quotations/create/new']);
  }
  ngOnDestroy(): void {
    for(let i=0;i<this.subscribtions.length;i++){
      this.subscribtions[i].unsubscribe()
    }
  }
}
