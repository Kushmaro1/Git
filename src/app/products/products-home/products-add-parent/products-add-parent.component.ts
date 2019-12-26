import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Globals } from 'src/app/translator/class/globals.service';
import { ProductsService } from '../../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-add-parent',
  templateUrl: './products-add-parent.component.html',
  styleUrls: ['./products-add-parent.component.less']
})
export class ProductsAddParentComponent implements OnInit, OnDestroy {
  header = 'Add New Product'
  returnDelete = 'Back'
  autoComplete = []
  edit = -1;
  askForNew = false
  edit2 = -1;
  avilable;
  action: string;
  type: string
  sub: Subscription;
  productAddForm: any;
  selectedParentTyp :string;
  isAdminUse = false;
  parentTypes = [
    'basic',
    'generic',
    'set'
  ]
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
    'Raw materials and consumables'

  ]
  additional_parent_items = []
  accessories = []

  public tableStructure = {
    tableName: 'Child Products Table',
    // print:true,
    rowsperpage: 10,
    // editable:[],
    searchable: [],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon: {
      'Edit': true,
      'Delete': true,
      "View": true
    },
    buttonIconClass: {
      "View": "fas fa-eye",
      "Edit": "fas fa-pencil-alt",
      "Delete": "fas fa-trash-alt"
    },
    buttons: {
      "View": "viewChildProduct",
      "Edit": "editChildProduct",
      "Delete": "deleteChildProduct"
    },
    aliaces: {
      'id': "Bar Code",
      'serial_number': "Serial Number",
      'user': "Customer",


    },
    headers: [
      'serial_number',
      'id',
      'user',

    ],
    eclipsis: {
      // company_id : true,
      // name : true,
      // phone : true,
      // email : true,

    },
  };
  public chilrednsTableData = [];
  public instance: ProductsAddParentComponent;
  public myStyle = {
    actionsMenu: {
      // 'min-width':'calc(6vw)',
      // 'max-width':'calc(6vw)',
      'width': 'calc(6em + 120px)',
      'flex-shrink': '1',
      // 'overflow':'hidden',
      // 'text-overflow': 'ellipsis',
      // 'white-space': 'nowrap',
    },
    cell: {
      'company_id': {
        'min-width': 'calc(4vw)',
        'max-width': 'calc(4vw)',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      'full_name': {
        'min-width': 'calc(7vw)',
        'max-width': 'calc(7vw)',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      'phone': {
        'min-width': 'calc(5vw)',
        'max-width': 'calc(5vw)',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
      'email': {
        'min-width': 'calc(7vw)',
        'max-width': 'calc(7vw)',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },

    },
    "View": {
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
      'color': 'var(--element10, #4098FE)'
    },
    "ViewHover": {
      'color': 'var(--element3hover, #75E5BE)',
      // 'text-shadow': '0px 1px 1px rgba(0, 0, 0, 0.8)',
    }
    // "table":{"color":this.colorT}

  }
  productsTableForm: any;
  dates = [];
  id;
  askForDelete: boolean = false;
  idToDelete: any;
  constructor(
    private fb: FormBuilder,
    public glob: Globals,
    public ps: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.instance = this;
    this.sub = this.route.params.subscribe(params => {
      this.action = params["value"];
      this.type = this.route.snapshot.data['type'];
      console.log(this.type)
      switch (this.type) {
        case 'new': {

          this.initForm();
          this.getDataFromStorage();
          break;
        }
        case 'edit': {
          this.header = 'Edit Parent Product'
          this.returnDelete = 'Delete'
          this.initForm();
          this.getDataFromServer();
          break;
        }
        case 'view': {
          this.header = 'View Parent Product'
          this.returnDelete = 'Edit'
          this.initForm();
          this.getDataFromServer();
          break;
        }
      }
    });

  }
  ngOnInit() {
    const user = sessionStorage.getItem('userPermission');
    this.isAdminUse = user === 'admin';
    this.productsTableForm = this.fb.group({
      date_from: [''],
      date_to: ['']

    });
  }
  focusOnNew(index) {
    let el = document.getElementById('positionfield' + index);
    el.focus();
  }
  focusOnNew2(index) {
    let el = document.getElementById('accessoriesfield' + index);
    el.focus();
  }
  focusOnNext(index, name) {
    let el = document.getElementById(name + index);
    el.focus();
  }
  editEntry(index) {
    this.edit == index ? this.edit = -1 : this.edit = index;
    this.edit2 = -1;
    window.requestAnimationFrame(this.focusOnNew.bind(this, index))
    // document.getElementById('positionfield' + index).focus();
  }
  editEntry2(index) {
    this.edit2 == index ? this.edit2 = -1 : this.edit2 = index;
    this.edit = -1;
    window.requestAnimationFrame(this.focusOnNew2.bind(this, index))
    // document.getElementById('positionfield' + index).focus();
  }
  nextField(e, name, index) {
    e.preventDefault()
    window.requestAnimationFrame(this.focusOnNext.bind(this, index, name))
  }
  getDataFromStorage() {
    let json = JSON.parse(sessionStorage.getItem('addNewProduct'));
    if (json != null && json != undefined) {
      this.fillForm(json)
    }
  }
  addDate() {

    let date = {
      date_from: this.productsTableForm.value['date_from'].split('-').reverse().join('/'),
      date_to: this.productsTableForm.value['date_to'].split('-').reverse().join('/')
    }

    this.dates.push(date);
    this.getProductAvilability();
  }
  getProductAvilability() {

    let parentDates = {};
    parentDates['parent_id'] = this.productAddForm.get('id').value;
    parentDates['dates'] = [];

    for (let index = 0; index < this.dates.length; index++) {
      let curr_date = this.dates[index];
      let curr_from_date = curr_date.date_from.split('/').reverse().join('-');
      let curr_to_date = curr_date.date_to.split('/').reverse().join('-');
      let date_to_add = {
        date_from: curr_from_date,
        date_to: curr_to_date
      }
      parentDates['dates'].push(date_to_add);
    }

    this.productsTableForm.controls['date_from'].setValue('')
    this.productsTableForm.controls['date_to'].setValue('')

    let payLoad = JSON.stringify(parentDates);
    // let payLoad = JSON.stringify(parentDates, this.getCircularReplacer);
    this.ps.getParentProductAvilablity(payLoad).subscribe(data => {
  ;
      if (data.response_code < 500) {
        let avilablity_schedule = data.data.avilablity_schedule;
        let curr_avilable_min;
        for (let index = 0; index < avilablity_schedule.length; index++) {
          const product_avilablity = avilablity_schedule[index];
          let avilable_amount = product_avilablity.avilable;
          if (avilable_amount < curr_avilable_min || index == 0) {
            curr_avilable_min = avilable_amount;
          }
        }
        this.avilable = curr_avilable_min;
      }
      else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    });

  }

  remove_date(index) {
    this.dates.splice(index, 1);
    this.getProductAvilability();
  }


  selectEntryForAutoComplete(com) {
    this.additional_parent_items[this.edit]['sub'] = com.name;
    this.additional_parent_items[this.edit]['id'] = com.id;
    this.autoComplete = JSON.parse(JSON.stringify(this.ps.searchForAutoComplete(this.additional_parent_items[this.edit]['sub'])))
  }
  getDataFromServer() {
    if (Object.keys(this.ps.selectedProduct).length) {

    } else {
      this.ps.selectProduct(this.action)
    }
    let json = JSON.parse(JSON.stringify(this.ps.selectedProduct));
    json['category'] = this.ps.categoriesMapReverse.get(json['category']) || json['category']
    console.log(json)
    this.fillForm(json)
    // console.log(json)
    // console.log(this.ps.categoriesMapReverse)
    // json['category'] = this.ps.categoriesMapReverse.get(json['category'])
    this.ps.getParentProductsById(this.action).subscribe(data => {
      if (data.response_code < 500) {
        let json = JSON.parse(JSON.stringify(data.data));
        // let json=JSON.parse(JSON.stringify(this.ps.selectedProduct));
        json['category'] = this.ps.categoriesMapReverse.get(json['category']) || json['category']
        if (json != null && json != undefined) {
          this.fillForm(json)
        }
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })

  }
  ngAfterViewInit(): void {
    if (this.action == 'new') {
      this.ps.messs.setSubNav.emit('Add New Product');
    }
  }
  initForm() {
    this.productAddForm = this.fb.group({
      name: [, Validators.required],
      id: [, Validators.required],
      category: [, Validators.required],
      price: [, Validators.required],
      description: [''],
      noDiscount: [''],
      parent_type: [, Validators.required],
    });
    this.additional_parent_items = []
    this.accessories = []
  }
  ngOnDestroy() {
    if (this.action == 'new') {
      let json = JSON.parse(JSON.stringify(this.productAddForm.value));
      json['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items))
      json['accessories'] = JSON.parse(JSON.stringify(this.accessories))
      sessionStorage.setItem('addNewProduct', JSON.stringify(json));
    }

    this.sub.unsubscribe();
  }
  fillForm(json) {

    this.productAddForm.get('name').setValue(json['name'])
    this.productAddForm.get('id').setValue(json['id'])
    this.id = json['id'];
    this.productAddForm.get('category').setValue(json['category'])
    // this.productAddForm.get('status').setValue(json['status'])
    this.productAddForm.get('price').setValue(json['price'])
    this.productAddForm.get('description').setValue(json['description'])
    this.productAddForm.get('noDiscount').setValue(json['noDiscount'])
    this.productAddForm.get('parent_type').setValue(json['parent_type'])
    // console.log(this.productAddForm)
    json['additional_parent_items'] = json['additional_parent_items'] || []
    this.additional_parent_items = JSON.parse(JSON.stringify(json['additional_parent_items']))
    json['accessories'] = json['accessories'] || []
    this.accessories = JSON.parse(JSON.stringify(json['accessories']))
    // this.accessories = this.accessories || []
    console.log(json);
    switch (this.type) {
      case 'new': {

        break;
      }
      case 'edit': {
        // this.chilrednsTableData = JSON.parse(JSON.stringify(json['children']))
        // this.productAddForm.controls['price'].disable()
        this.chilrednsTableData = JSON.parse(JSON.stringify(json['children']))
        this.productAddForm.controls['id'].disable()
        this.productAddForm.controls['parent_type'].disable()
        break;
      }
      case 'view': {
        this.chilrednsTableData = JSON.parse(JSON.stringify(json['children']))
        this.productAddForm.controls['price'].disable()
        this.productAddForm.controls['id'].disable()
        this.categories = []
        this.categories.push(json['category'])

        // this.productAddForm.controls['category'].disable()
        this.productAddForm.controls['description'].disable()
        this.productAddForm.controls['name'].disable()
        this.productAddForm.controls['parent_type'].disable()
        this.productAddForm.controls['noDiscount'].disable()

        break;
      }

    }

  }
  comeBack() {
    if (this.type == 'view') {
      this.router.navigate(['../main/products/edit/' + this.action]);
      return
    }
    if (this.action == 'new') {
      this.router.navigate(['../main/products/table']);
      return
    } else {

      this.askForNew = true;
      console.log(this.askForNew)
    }
  }
  comeBack2() {
    this.router.navigate(['../main/products/table']);
  }
  deleteProduct() {
    this.ps.deleteProduct({ id: this.action, "parent_type": "basic" }).subscribe(data => {
      if (data.response_code < 500) {
        this.ps.deleteMyProduct(this.action)
        this.ps.setMessage('', 'Success');
        this.router.navigate(['../main/products/table']);
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }
  setItems(e, index, full_name) {


    switch (full_name) {
      case 'amount': {
        if (Number(e.target.value) > 0) {
          this.additional_parent_items[index][full_name] = Number(e.target.value)
          delete (this.additional_parent_items[index]['error'])
        } else {
          this.additional_parent_items[index]['error'] = true;

        }
        break;
      }
      case 'sub': {
        this.additional_parent_items[index][full_name] = e.target.value
        if (this.additional_parent_items[index][full_name].length > 2 && full_name == 'sub') {
          this.autoComplete = JSON.parse(JSON.stringify(this.ps.searchForAutoComplete(this.additional_parent_items[index][full_name])))
        }
        break;
      }
    }
    // console.log(this.contacts[index][full_name])
  }
  setItems2(e, index, full_name) {


    switch (full_name) {
      case 'amount': {
        if (Number(e.target.value) > 0) {
          this.accessories[index][full_name] = Number(e.target.value)
          delete (this.accessories[index]['error'])
        } else {

          this.accessories[index]['error'] = true
        }
        break;
      }
      case 'sub': {
        this.accessories[index][full_name] = e.target.value
        break;
      }
      case 'name': {
        this.accessories[index][full_name] = e.target.value
        break;
      }
    }
    // console.log(this.contacts[index][full_name])
  }
  itemAction(action, e, index) {
    switch (action) {
      case 'delete': {
        // if(this.action == 'new'){
        this.additional_parent_items.splice(index, 1);
        // }else{
        //   let payload={
        //     "contact_id":this.additional_parent_items[index]['contact_id'],
        //     "client_id":this.action
        //   }
        //   this.ps.deleteContact(payload).subscribe(data=>{
        //             if(data.response_code <500){
        //               this.additional_parent_items.splice(index,1);
        //             }
        //   })
        // }
        break;
      }
      case 'add': {
        this.additional_parent_items.push({

          "sub": "",
          "amount": ""

        });
        this.edit = this.additional_parent_items.length - 1;
        this.edit2 = -1;
        window.requestAnimationFrame(this.focusOnNew.bind(this, this.additional_parent_items.length - 1))
        break;
      }
    }
  }
  itemAction2(action, e, index) {
    switch (action) {
      case 'delete': {
        // if(this.action == 'new'){
        this.accessories.splice(index, 1);
        // }else{
        //   let payload={
        //     "contact_id":this.additional_parent_items[index]['contact_id'],
        //     "client_id":this.action
        //   }
        //   this.ps.deleteContact(payload).subscribe(data=>{
        //             if(data.response_code <500){
        //               this.additional_parent_items.splice(index,1);
        //             }
        //   })
        // }
        break;
      }
      case 'add': {
        this.accessories.push({

          "name": "",
          "amount": ""

        });
        this.edit2 = this.accessories.length - 1;
        this.edit = -1;
        window.requestAnimationFrame(this.focusOnNew2.bind(this, this.accessories.length - 1))
        break;
      }
    }
  }
  createParent(parentPayload) {
    let error = false
    for (let k = this.additional_parent_items.length - 1; k >= 0; k--) {
      if (!this.additional_parent_items[k]['sub']) {
        this.additional_parent_items.splice(k, 1);
      }
      else if (this.additional_parent_items[k]['error'] || !this.additional_parent_items[k]['amount']) {
        this.additional_parent_items[k]['error'] = true
        error = true
      }
    }
    for (let l = this.accessories.length - 1; l >= 0; l--) {
      if (!this.accessories[l]['name']) {
        this.accessories.splice(l, 1);
      }
      else if (this.accessories[l]['error'] || !this.accessories[l]['amount']) {
        this.accessories[l]['error'] = true
        error = true
      }
    }
    if (error) {
      return
    }
    parentPayload['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items));
    parentPayload['accessories'] = JSON.parse(JSON.stringify(this.accessories));
    this.ps.createProduct(parentPayload).subscribe(data => {
      if (data.response_code < 500) {
        this.ps.newParentProduct(parentPayload)
        this.ps.setMessage('', 'Success');
        this.initForm()
        this.router.navigate(['../main/products/table']);
      } else {
        if (data.response_code == 540) {
          this.ps.setMessage('', 'Duplicate SKU', { error: true });
          return
        }
        if (data.response_code == 541) {
          this.ps.setMessage('', 'Duplicate Name', { error: true });
          return
        }
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }

  editParent(parentPayload) {

    let payload = {}
    let error = false
    for (let k = this.additional_parent_items.length - 1; k >= 0; k--) {
      if (!this.additional_parent_items[k]['sub']) {
        this.additional_parent_items.splice(k, 1);
      }
      else if (this.additional_parent_items[k]['error'] || !this.additional_parent_items[k]['amount']) {
        this.additional_parent_items[k]['error'] = true
        error = true
      }
    }
    for (let l = this.accessories.length - 1; l >= 0; l--) {
      if (!this.accessories[l]['name']) {
        this.accessories.splice(l, 1);
      }
      else if (this.accessories[l]['error'] || !this.accessories[l]['amount']) {
        this.accessories[l]['error'] = true
        error = true
      }
    }
    if (error) {
      return
    }
    payload['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items));
    payload['accessories'] = JSON.parse(JSON.stringify(this.accessories));
    parentPayload['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items));
    parentPayload['accessories'] = JSON.parse(JSON.stringify(this.accessories));
    parentPayload['id'] = this.id;
    payload['id'] = this.id;
    // console.log(parentPayload)
    // console.log(this.accessories)
    this.ps.updateProduct(parentPayload).subscribe(data => {
      if (data.response_code < 500) {

        this.ps.setMessage('', 'Success');
        this.editAndNavigate(parentPayload)

      } else {
        let error_msg = '';
        switch (data.response_code) {
          case 504: {
            error_msg = 'Server Error'
            break;
          }

          case 523: {
            error_msg = 'parent does not exist in Data Base';
            break;
          }

          case 524: {
            error_msg = 'new name is already taken by another parent';
            break;
          }
        }
        this.ps.setMessage('', error_msg, { error: true });
      }
    })
    // this.ps.updateProductAdditionaItems(payload).subscribe(data =>{
    //   if(data.response_code<500){
    //     counter--
    //     if(!counter){
    //       this.ps.setMessage ('', 'Success'); 
    //       this.editAndNavigate(parentPayload)
    //     }
    //   }else{
    //     this.ps.setMessage ('', 'Server Error',{error:true}); 
    //   }
    // })
  }
  editAndNavigate(parentPayload) {
    this.ps.editParentProduct(parentPayload)
    this.router.navigate(['../main/products/table']);
  }
  viewChildProduct(buttonName, row) {
    this.router.navigate(['../main/products/child/view/' + row['id']]);
  }
  editChildProduct(buttonName, row) {
    // console.log(row)
    // this.ps.selectProduct(row['id'])
    this.router.navigate(['../main/products/child/edit/' + row['id']]);
  }
  deleteChildProduct(buttonName, row) {

    if (!this.askForDelete) {
      this.idToDelete = row['id']
      this.askForDelete = !this.askForDelete
    } else {
      this.askForDelete = !this.askForDelete
      this.ps.deleteChildProduct({ id: this.idToDelete }).subscribe(data => {
        if (data.response_code < 500) {
          this.ps.myDeleteChildProduct(this.idToDelete, this.ps.selectedProduct['id']);
          for (let i = 0; i < this.chilrednsTableData.length; i++) {
            if (this.chilrednsTableData[i]['id'] == this.idToDelete) {
              this.chilrednsTableData.splice(i, 1);
              this.chilrednsTableData = JSON.parse(JSON.stringify(this.chilrednsTableData))
              this.ps.setMessage('', 'Success');
              return;
            }
          }
        } else {
          this.ps.setMessage('', 'Server Error', { error: true });
        }
      })
    }

  }
  addChildProduct() {
    this.router.navigate(['../main/products/child/add/' + this.action]);
  }

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (value != null && typeof value == "object") {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  submitForm() {

    let arr = Object.keys(this.productAddForm.value);
    for (let i = 0; i < arr.length; i++) {
      this.productAddForm.controls[arr[i]].markAsTouched();
    }
    if (this.productAddForm.valid) {
      switch (this.type) {
        case 'new': {
          let payload = JSON.parse(JSON.stringify(this.productAddForm.value));
          payload['price'] = Number(payload['price'])
          payload['status'] = 1;
           payload['parent_type'] = this.selectedParentTyp;
          payload['category'] = this.ps.categoriesMap.get(payload['category']) || payload['category']
          // payload['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items));
          // payload['children'] = [];
          this.createParent(payload)

          break;
        }
        case 'edit': {
          let payload = JSON.parse(JSON.stringify(this.productAddForm.value));
          payload['status'] = 1;
          payload['parent_type'] = this.selectedParentTyp;
          payload['price'] = Number(payload['price'])
          payload['category'] = this.ps.categoriesMap.get(payload['category']) || payload['category']
          //payload['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items));
          // payload['children'] = [];
          this.editParent(payload)
          console.log(payload);
          break;
        }
        case 'view': {
          // let payload=JSON.parse(JSON.stringify(this.productAddForm.value));
          // payload['status'] = 1;
          // payload['price'] = Number(payload['price'])
          // payload['category'] = this.ps.categoriesMap.get(payload['category']) || payload['category']
          // payload['additional_parent_items'] = JSON.parse(JSON.stringify(this.additional_parent_items));
          // payload['children'] = [];
          // this.ps.updateProduct(payload).subscribe(data=>{
          //   if(data.response_code<500){
          //     this.ps.updateProduct(payload)
          //     this.router.navigate(['../main/products/table']);
          //   }
          // }) 
          break;
        }

      }

    }
  }
}
