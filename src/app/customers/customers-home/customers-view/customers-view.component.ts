import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../customer.service';
import { Globals } from '../../../translator/class/globals.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.less']
})
export class CustomersViewComponent implements OnInit {
  action: string;
  sub: Subscription;
  customer={}
  isAdminUse = false;
  contacts=[
    {
      'job':'',
      'full_name':'',
      'phone':'',
      'email':''
    }
  ]


  public tableStructure2 = {
    tablen : 3,
    rowsperpage: 4,
    searchable:[],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    buttonIcon:{
      'View':true,
      "PDF":true
     },
     buttonIconClass:{
      "View":"fas fa-eye",
      "PDF":"fas fa-file-pdf"
     },
    colHeight:30,
    buttons: {
      "View": "viewQuotation",
      "PDF": "printQuotation"
    },
    aliaces: {
      'id':"#",
      'from_date': "From",
      'to_date': "To",
      'project_name': "Project Name",
      'status': "Status",
      'total_price': "Total Price",
      
    },
    headers: [
      'id',
      'from_date',
      'to_date',
      'project_name',
      'status',
      'total_price',
    ],
    eclipsis:{
      // company_id : true,
      // full_name : true,
      // phone : true,
      // email : true,
    },
  };
  public tableStructure3 = {
    // tablen : 4,
    rowsperpage: 4,
    // colHeight:30,
    searchable:[],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    buttonIcon:{
      'View':true,
      "PDF":true
     },
     buttonIconClass:{
      "View":"fas fa-eye",
      "PDF":"fas fa-file-pdf"
     },
    buttons: {
      "View": "viewQuotation",
      "PDF": "printQuotation"
    },
    aliaces: {
      'id':"#",
      'from_date': "From",
      'to_date': "To",
      'project_name': "Project Name",
      'status': "Status",
      'total_price': "Total Price",
      
    },
    headers: [
      'id',
      'from_date',
      'to_date',
      'project_name',
      'status',
      'total_price',
    ],
    eclipsis:{
      // company_id : true,
      // full_name : true,
      // phone : true,
      // email : true,
    },
  };
  public tableData3 = [ ]
  public tableData2 = [ ]
public instance: CustomersViewComponent;
  public myStyle2={
    // colHeight:30,
    actionsMenu:{
      'min-width':'calc(6vw)',
      // 'max-width':'calc(6vw)',
      // 'overflow':'hidden',
      // 'text-overflow': 'ellipsis',
      // 'white-space': 'nowrap',
    },
    cell:{
      'company_id':{
        'min-width':'calc(3vw)',
        'max-width':'calc(3vw)',
        'overflow':'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
    }
    
  }
  constructor(
    private fb: FormBuilder,
    public glob : Globals,
    public cs :CustomerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.instance=this;
    this.sub = this.route.params.subscribe(params => {
      this.action = params["value"];
      // console.log(this.action)
      this.getDataFromServer();
    
      
    });
   }
   comeBack(){
    this.router.navigate(['../main/customers/table']);
   }
   editCustomer(){
    this.router.navigate(['../main/customers/edit/' + this.action]);
   }
  ngOnInit() {
    const user = sessionStorage.getItem('userPermission');
    this.isAdminUse = user === 'admin';
  }



 getDataFromServer(){
  this.cs.getClient(this.action).subscribe(data=>{
    if(data.response_code < 500){
      this.customer = JSON.parse(JSON.stringify(data.data));
      this.customer['payment_method'] = this.cs.paymentMapReverse.get(this.customer['payment_method'])
      this.customer['client_category'] = this.cs.categoriesMapReverse.get(this.customer['client_category'])
      this.contacts= []
      console.log(this.customer)
      // try {
        if( this.customer['contacts']){
          this.contacts = JSON.parse(JSON.stringify( this.customer['contacts']))
        }
        
      // } catch (error) {
        
      // }
    }else{
      this.cs.setMessage ('', 'Server Error',{error:true}); 
    }
  })
  }
}
