import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../translator/class/globals.service';
import { CustomerService } from '../../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers-add',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.less']
})
export class CustomersAddComponent implements OnInit, OnDestroy, AfterViewInit {
   header = 'Add New Customer'
  edit = -1;
  action: string;
  sub: Subscription;
  document=document;
  contacts=[
  ]
  categories=[
    "Production Company", "Student Production","Camera Man","Lighting","Grip",
    "Sound","Assistant Producer","Supplier"
  ]
  payments=[
    'Immediate',
    'Credit 30',
    'Credit 60',
    'Credit 90'
  ]
  customerAddForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public glob : Globals,
    public cs :CustomerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    // this.contacts.push({
    //   'job':'',
    //   'full_name':'',
    //   'phone':'',
    //   'email':''
    // });
    this.sub = this.route.params.subscribe(params => {
      this.action = params["value"];
      // console.log(this.action)
      switch(this.action){
        case 'new':{
         
          this.initForm();
          this.getDataFromStorage();
          break;
        }
        default:{
          this.header =  'Edit Customer'
          this.initForm();
          this.getDataFromServer();
        }
      }
    });
  }

  ngOnInit() {
   
    // this.customerAddForm.controls.payment.markAsTouched()
  }
  ngAfterViewInit(): void {
    if(this.action == 'new'){
        this.cs.messs.setSubNav.emit('Add New Customer'); 
    }
  }
  setContatc(e,index,full_name){
    this.contacts[index][full_name] = e.target.value
    // console.log(this.contacts[index][full_name])
  }
  contactAction(action,e,index){
    switch(action){
      case 'delete':{
        if(this.action == 'new'){
          this.contacts.splice(index,1);
        }else{
          let payload={
            "contact_id":this.contacts[index]['contact_id'],
            "client_id":this.action
          }
          this.cs.deleteContact(payload).subscribe(data=>{
                    if(data.response_code <500){
                      this.contacts.splice(index,1);
                      this.cs.setMessage ('', 'Success'); 
                    } else{
                      this.cs.setMessage ('', 'Server Error',{error:true}); 
                    }
          })
        }
        break;
      }
      case 'add':{
        this.contacts.push({
          'job':'',
          'full_name':'',
          'phone':'',
          'email':''
        });
        this.edit=this.contacts.length-1;
        window.requestAnimationFrame(this.focusOnNew.bind(this,this.contacts.length-1))
        break;
      }
    }
 
 
  }
  comeBack(){

    switch(this.action){
      case 'new':{
        this.router.navigate(['../main/customers/table']);
        break;
      }
      default:{
        this.router.navigate(['../main/customers/view/' + this.action]);
      }
    }
  }
  focusOnNew(index){
    let el=document.getElementById('positionfield' + index);
    el.focus();
  }
  focusOnNext(index, name){
    let el=document.getElementById(name + index);
    el.focus();
  }
  editEntry(index){
    this.edit==index ? this.edit=-1:this.edit=index; 
    window.requestAnimationFrame(this.focusOnNew.bind(this,index))
    // document.getElementById('positionfield' + index).focus();
  }
  nextField(e,name,index){
    e.preventDefault()
    window.requestAnimationFrame(this.focusOnNext.bind(this,index,name))
  }
  initForm(){
    this.customerAddForm = this.fb.group({
      full_name: [,Validators.required],
      company_id: [''],
      email: [,[Validators.required,Validators.email]],
      client_category: [,Validators.required],
      phone: [''],
      payment_method: [,Validators.required],
      streat_addres: [''],
      city: [''],
      area_code: [''],
      country: [''],
      remarks:[''],
    });  
    this.contacts=[]
    console.log()
  }
  getDataFromStorage(){
    let json=JSON.parse(sessionStorage.getItem('addNewCustomer'));
    if(json != null && json != undefined){
      this.fillForm(json)
    }
  }
  getDataFromServer(){
    this.cs.getClient(this.action).subscribe(data=>{
      let json=JSON.parse(JSON.stringify(data.data));
      json['payment_method'] = this.cs.paymentMapReverse.get(json['payment_method'])
      json['client_category'] = this.cs.categoriesMapReverse.get(json['client_category'])
      if(json != null && json != undefined){
        this.fillForm(json)
      }
    })
   
  }
  fillForm(json){
    this.customerAddForm.get('full_name').setValue(json['full_name'])
    this.customerAddForm.get('company_id').setValue(json['company_id'])
    this.customerAddForm.get('email').setValue(json['email'])
    this.customerAddForm.get('client_category').setValue(json['client_category'])
    this.customerAddForm.get('phone').setValue(json['phone'])
    this.customerAddForm.get('payment_method').setValue(json['payment_method'])
    this.customerAddForm.get('city').setValue(json['city'])
    this.customerAddForm.get('area_code').setValue(json['area_code'])
    this.customerAddForm.get('country').setValue(json['country'])
    this.customerAddForm.get('remarks').setValue(json['remarks'])
    this.customerAddForm.get('streat_addres').setValue(json['streat_addres'])
    this.contacts = JSON.parse(JSON.stringify(json['contacts']))
    
  }
  addCustomer(customer, newEntry){
    this.cs.createClient(customer).subscribe(data=>{
      if(data.response_code < 500){
        customer['id'] = data.data['id'];
        this.cs.updateContacts(customer).subscribe(data=>{
          if(data.response_code < 500){
            this.cs.newClient(newEntry);
            this.cs.setMessage ('', 'Success'); 
            this.initForm();
            this.comeBack();
          }
          else{
            this.cs.setMessage ('', 'Server Error',{error:true}); 
          }
        })
      }else{ 
        if(data.response_code == 608){
          this.cs.setMessage ('', 'Duplicate Name',{error:true});     
          return; 
        }
          this.cs.setMessage ('', 'Server Error',{error:true});      
      }
    })
  }
  updateCustomer(customer, newEntry){
    this.cs.updateClient(customer).subscribe(data=>{
      if(data.response_code < 500){
        this.cs.updateContacts(customer).subscribe(data=>{
          if(data.response_code < 500){
            this.cs.editClient(customer);
            this.cs.setMessage ('', 'Success'); 
            this.comeBack()
          }else{
            this.cs.setMessage ('', 'Server Error',{error:true}); 
          }
        })
      }else{ 
        this.cs.setMessage ('', 'Server Error',{error:true});      
      }
    })
  }
  submitForm(){
    let arr=Object.keys(this.customerAddForm.value);
    for(let i=0;i<arr.length;i++){
      this.customerAddForm.controls[arr[i]].markAsTouched();
    }
    if(this.customerAddForm.valid){
      for(let k=this.contacts.length-1;k>=0;k--){
        if(!Object.values(this.contacts[k]).join('')){
          this.contacts.splice(k,1);
        }
      }
      let json=JSON.parse(JSON.stringify(this.customerAddForm.value));
      json['contacts'] = JSON.parse(JSON.stringify(this.contacts))
      json['payment_method'] = this.cs.paymentMap.get(json['payment_method']);
      json['client_category'] = this.cs.categoriesMap.get(json['client_category']);
      let newEntry={
      'company_id':json['company_id'],
      'full_name': json['full_name'],
      'phone': json['phone'],
      'email': json['email'],
      'client_category': json['client_category']
      }
      if(this.action == 'new'){
        this.addCustomer(json,newEntry);
        
        // this.contacts=[]
        // sessionStorage.removeItem('addNewCustomer');
        // this.initForm()
      }else{
        newEntry['id'] = this.action;
        json['id'] = this.action;
        this.updateCustomer(json, newEntry);
        
      }
     
  //    console.log(newEntry)
    }
    // console.log(this.customerAddForm)
 //   console.log(this.customerAddForm.valid)
    // console.log(this.customerAddForm.value)
  }
  ngOnDestroy(){
    if(this.action == 'new'){
      let json=JSON.parse(JSON.stringify(this.customerAddForm.value));
      json['contacts'] = JSON.parse(JSON.stringify(this.contacts))
      sessionStorage.setItem('addNewCustomer', JSON.stringify(json));
    }
  
    this.sub.unsubscribe();
  }
}
