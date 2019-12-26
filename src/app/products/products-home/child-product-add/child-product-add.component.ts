import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Globals } from 'src/app/translator/class/globals.service';
import { ProductsService } from '../../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-child-product-add',
  templateUrl: './child-product-add.component.html',
  styleUrls: ['./child-product-add.component.less']
})
export class ChildProductAddComponent implements OnInit, OnDestroy, AfterViewInit {
  childId = -1
  docView
  parent_id
  remarks = []
  askForNew = false;
  showDoc = false;
  header = 'Add New Child Product'
  returnDelete = 'Back'
  action: string;
  file: File;
  fileBase64
  type: string
  sub: Subscription;
  productAddForm: any;
  documents = [];
  images = [];
  selectedParentTyp: string;
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
  public tableStructure = {
    tableName: 'Child History Table',
    // print:true,
    rowsperpage: 6,
    // editable:[],
    searchable: [],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon: {
      // 'Edit':true,
      // 'Delete':true,
      // "View":true
    },
    buttonIconClass: {
      // "View":"fas fa-eye",
      // "Edit":"fas fa-pencil-alt",
      // "Delete":"fas fa-trash-alt"
    },
    buttons: {
      // "View": "viewChildProduct",
      // "Edit": "editChildProduct",
      // "Delete": "deleteChildProduct"
    },
    aliaces: {
      'status': "Status",
      'quotation_id': "#Quotation",
      'order_id': "#Order",
      'date_from': "From",
      'date_to': "To"
    },
    headers: [
      'status',
      'quotation_id',
      'order_id',
      'date_from',
      'date_to',

    ],
    eclipsis: {
      // company_id : true,
      // name : true,
      // phone : true,
      // email : true,

    },
  };
  public tableStructure2 = {
    tableName: 'Child Images Table',
    // print:true,
    rowsperpage: 6,
    // editable:[],
    searchable: [],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon: {
      // 'Edit':true,
      'Delete': true,
      "View": true
    },
    buttonIconClass: {
      "View": "fas fa-eye",
      // "Edit":"fas fa-pencil-alt",
      "Delete": "fas fa-trash-alt"
    },
    buttons: {
      "View": "viewImage",
      // "Edit": "editChildProduct",
      "Delete": "deleteImage"
    },
    aliaces: {
      'upload_date': "Upload Date",
      'id': "#",
    },
    headers: [
      'upload_date',
      'id',
    ],
    eclipsis: {
      // company_id : true,
      // name : true,
      // phone : true,
      // email : true,

    },
  };
  public tableStructure3 = {
    tableName: 'Child Documents Table',
    // print:true,
    rowsperpage: 6,
    // editable:[],
    searchable: [],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon: {
      // 'Edit':true,
      'Delete': true,
      "View": true
    },
    buttonIconClass: {
      "View": "fas fa-eye",
      // "Edit":"fas fa-pencil-alt",
      "Delete": "fas fa-trash-alt"
    },
    buttons: {
      "View": "viewDocument",
      // "Edit": "editChildProduct",
      "Delete": "deleteDocument"
    },
    aliaces: {
      'upload_date': "Upload Date",
      'id': "#",
    },
    headers: [
      'upload_date',
      'id',
    ],
    eclipsis: {
      // company_id : true,
      // name : true,
      // phone : true,
      // email : true,

    },
  };
  public tableData = []
  public instance: ChildProductAddComponent;
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
  serial_number: any;
  imageForm: any;
  docForm: any;
  document = 0
  showData: boolean = false;
  askForDelete: boolean = false;
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
          this.ps.selectProduct(this.action);
          // let test = JSON.parse(JSON.stringify(this.ps.selectedProduct))
          // console.log(test)
          this.initForm();
          this.getDataFromStorage();
          break;
        }
        case 'edit': {
          this.header = 'Edit Child Product'
          this.returnDelete = 'Delete'
          this.initForm();
          this.getDataFromServer();
          break;
        }
        case 'view': {
          delete (this.tableStructure2['buttons']['Delete'])
          delete (this.tableStructure3['buttons']['Delete'])
          this.header = 'View Child Product'
          this.returnDelete = 'Delete'
          this.initForm();
          this.getDataFromServer();
          // this.getData();
          break;
        }
      }
    });

  }
  ngAfterViewInit(): void {
    if (this.type == 'new') {
      let el = document.getElementById('barCodeId');
      el.focus();
    }
    let el = document.getElementById('myRemarkChild');
    el.style.setProperty('--remarkheight', 54 + 'vh');
  }
  ngOnInit() {


  }

  handleFailedCreateChild() {
    this.productAddForm.controls['id'].setErrors({ 'incorrect': true });
  }

  addNewChild() {
    this.initForm();
    this.askForDelete = false;
    if (this.type == 'new') {
      let el = document.getElementById('barCodeId');
      el.focus();
    }
  }

  initForm() {
    // "id": "test",
    //     "name": "obj",
    //     "category": 1,
    //     "price": 13,
    //     "additional_items": null,
    //     "description": "some desc",
    //     "category_name": "מצלמה",
    if (this.type == 'new') {
      this.productAddForm = this.fb.group({
        id: ['', Validators.compose([Validators.minLength(12), Validators.maxLength(12)])],
        serial_number: [''],
        purchase_date: [''],
        supplier: [''],
        purchasing_price: [''],
        insurance_expiration_date: [''],
        child_status: [1],
        total_amount: [''],
        parent_id: [this.ps.selectedProduct['id'], Validators.required],
        name: [this.ps.selectedProduct['name'], Validators.required],
        category: [this.ps.categoriesMapReverse.get(this.ps.selectedProduct['category']) ? this.ps.categoriesMapReverse.get(this.ps.selectedProduct['category']) : this.ps.selectedProduct['category'], Validators.required],
        price: [this.ps.selectedProduct['price'], Validators.required],
        noDiscount: [this.ps.selectedProduct['noDiscount'], Validators.required],
        parent_type: [this.ps.selectedProduct['parent_type'], Validators.required],
        description: [''],
        amount: ['', Validators.required],
      });
      this.productAddForm.controls['parent_id'].disable();
      this.productAddForm.controls['name'].disable();
      this.productAddForm.controls['price'].disable();
      this.categories = []
      this.categories.push(this.ps.categoriesMapReverse.get(this.ps.selectedProduct['category']) ? this.ps.categoriesMapReverse.get(this.ps.selectedProduct['category']) : this.ps.selectedProduct['category'])
      console.log(this.productAddForm)
      this.docForm = this.fb.group({
        data: new FormControl([])
      })
      this.imageForm = this.fb.group({
        data: new FormControl([])
      })
      this.showData = true
      return;
    }
    this.productAddForm = this.fb.group({
      id: [, Validators.compose([Validators.minLength(12), Validators.maxLength(12)])],
      serial_number: [''],
      purchase_date: [''],
      supplier: [''],
      purchasing_price: [''],
      insurance_expiration_date: [''],
      child_status: [1],
      total_amount: [''],
      parent_id: [''],
      name: [''],
      category: [, Validators.required],
      price: [''],
      description: [''],
      dataDoc: [''],
      dataImg: [''],
      noDiscount:[''],
      parent_type:[''],
      amount:['']

    });
    // if(this.type == 'view'){
    this.docForm = this.fb.group({
      data: []
    })
    this.imageForm = this.fb.group({
      data: []
    })
    // }
    console.log(this.productAddForm)
    this.showData = true
  }
  getDataFromServer() {
    this.ps.getChildProductsById(this.action).subscribe(data => {
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
    });
    this.ps.getChildProductRemarks(this.action).subscribe(data => {

      if (data.response_code < 500) {
        console.log(data)

        this.remarks = JSON.parse(JSON.stringify(data.data));
        this.remarks = [...this.remarks];
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    });
  }
  getfile(myEvent: any, document) {
;
    switch (this.type) {
      case 'new': {
    ;
        const fileList = myEvent.target.files;
        // this.file = fileList[0];

        if (fileList) {
          if (document) {
            this.documents = []
          } else {
            this.images = []
          }
          for (let file of fileList) {
            this.getBase64(file).then(
              data => {
                if (document) {
                  this.documents.push(data);
                  // this.docForm = this.fb.group({
                  //   data:[]
                  // })
                } else {
                  this.images.push(data);
                  // this.imageForm = this.fb.group({
                  //   data:[]
                  // })
                }
                // this.docView = data;
                // this.showDoc = true;
                // this.selectedFiles = this.sanitizer.bypassSecurityTrustResourceUrl( this.fileBase64);
              });
          }
        }

        break;
      }
      default: {
    ;
        this.document = document
        const fileList: FileList = myEvent.target.files;
        this.file = fileList[0];
        this.getBase64(this.file).then(
          data => {
            this.fileBase64 = data;
            this.docView = data;
            this.showDoc = true;

            // this.selectedFiles = this.sanitizer.bypassSecurityTrustResourceUrl( this.fileBase64);
          });
        break
      }
    }


  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  closeImage() {
    this.showDoc = false
    if (this.document) {
      this.docForm.get('data').setValue(null)
      return
    }
    this.imageForm.get('data').setValue(null)
  }
  saveFile() {
;
    if (this.document) {
      this.ps.createDocument({ 'id': this.childId, 'document': this.fileBase64 }).subscribe(data => {
        if (data.response_code < 500) {
          this.showDoc = false
          let doc = {
            id: data.data.doc_id,
            date: 'Current',
            document: this.fileBase64
          }
          this.documents.unshift(doc)
          this.documents = JSON.parse(JSON.stringify(this.documents))
          this.ps.setMessage('', 'Success');
        } else {
          this.ps.setMessage('', 'Server Error', { error: true });
        }
      })
    } else {
      this.ps.createImage({ 'id': this.childId, 'image': this.fileBase64 }).subscribe(data => {
        if (data.response_code < 500) {
          this.showDoc = false
          let doc = {
            id: data.data.img_id,
            date: 'Current',
            image: this.fileBase64
          }
          this.images.unshift(doc)
          this.images = JSON.parse(JSON.stringify(this.images))
          this.ps.setMessage('', 'Success');
        } else {
          this.ps.setMessage('', 'Server Error', { error: true });
        }
      })
    }
  }


  // getData(){
  //     this.ps.getChildProductImages(this.action).subscribe(data=>{
  //       if(data.response_code<500){
  //         this.images = JSON.parse(JSON.stringify(data.data));
  //       }else{
  //         this.ps.setMessage ('', 'Server Error',{error:true}); 
  //       }
  //     });
  //     this.ps.getChildProductDocuments(this.action).subscribe(data=>{
  //       if(data.response_code<500){
  //        this.documents = JSON.parse(JSON.stringify(data.data));
  //       }else{
  //         this.ps.setMessage ('', 'Server Error',{error:true}); 
  //       }
  //     });
  // }
  getDataFromStorage() {
    let json = JSON.parse(sessionStorage.getItem('addNewChildProduct'));

    if (json != null && json != undefined && json['parent_id'] != null) {
      json.parent_id = this.action;
      this.fillForm(json)
    }
  }
  ngOnDestroy() {
    if (this.type == 'new') {
      let json = JSON.parse(JSON.stringify(this.productAddForm.value));
      json['parent_id'] = this.action;
      sessionStorage.setItem('addNewChildProduct', JSON.stringify(json));
    }

    this.sub.unsubscribe();
  }
  comeBack() {
    if (this.type == 'new') {
      this.router.navigate(['../main/products/view/' + this.ps.selectedProduct['id']]);
    } else {
      this.askForNew = false
      this.askForDelete = true;

    }
  }
  goToEdit() {
    this.router.navigate(['../main/products/child/edit/' + this.action]);
  }
  deleteChildProduct() {
    this.ps.deleteChildProduct({ id: this.action }).subscribe(data => {
      if (data.response_code < 500) {
        this.ps.myDeleteChildProduct(this.action, this.parent_id);
        this.ps.setMessage('', 'Success');
        this.askForNew = false
        this.askForDelete = false;
        this.router.navigate(['../main/products/view/' + this.parent_id])
      } else {
        this.askForNew = false
        this.askForDelete = false;
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }
  comeBack2() {
    this.router.navigate(['../main/products/view/' + this.parent_id]);
  }
  fillForm(json) {
    this.selectedParentTyp = this.ps.selectedProduct['parent_type'] ;
    this.ps.selectProduct(json['parent_id']);
    this.productAddForm.get('id').setValue(json['id'])
    this.childId = json['id'];
    this.remarks = json['remarks'] || [];
    this.serial_number = json['serial_number'];
    this.productAddForm.get('serial_number').setValue(json['serial_number'])
    this.productAddForm.get('purchase_date').setValue(json['purchase_date'])
    this.productAddForm.get('supplier').setValue(json['supplier'])
    this.productAddForm.get('purchasing_price').setValue(json['purchasing_price'])
    this.productAddForm.get('insurance_expiration_date').setValue(json['insurance_expiration_date'])
    this.productAddForm.get('child_status').setValue(json['child_status'])
    this.productAddForm.get('total_amount').setValue(json['total_amount'])
    this.productAddForm.get('parent_id').setValue(json['parent_id'])
    this.productAddForm.get('category').setValue(json['category'])
    this.productAddForm.get('description').setValue(json['description'])
    this.productAddForm.get('parent_type').setValue(this.ps.selectedProduct['parent_type'])
    this.productAddForm.get('noDiscount').setValue(this.ps.selectedProduct['noDiscount'])
    this.productAddForm.get('amount').setValue(json['amount'])

   
    switch (this.type) {
      case 'new': {
        this.productAddForm.get('id').setValue('');
        break;
      }
      case 'edit': {
        this.parent_id = json['parent_id']
        this.productAddForm.get('name').setValue(json['name'])
        this.productAddForm.get('price').setValue(json['price'])
        this.productAddForm.controls['parent_id'].disable();
        this.productAddForm.controls['name'].disable();
        this.productAddForm.controls['price'].disable();
        this.productAddForm.controls['parent_type'].disable()
        this.productAddForm.controls['noDiscount'].disable()
        // this.productAddForm.controls['id'].disable();
        // this.productAddForm.controls['serial_number'].disable();
        this.categories = []
        this.categories.push(json['category'])
        this.images = JSON.parse(JSON.stringify(json['images']))
        this.documents = JSON.parse(JSON.stringify(json['documents']))
        break;
      }
      case 'view': {
        this.parent_id = json['parent_id']
        this.productAddForm.get('name').setValue(json['name'])
        this.productAddForm.get('price').setValue(json['price'])
        this.productAddForm.controls['parent_id'].disable();
        this.productAddForm.controls['name'].disable();
        this.productAddForm.controls['price'].disable();
        this.productAddForm.controls['id'].disable();
        this.productAddForm.controls['serial_number'].disable();
        this.productAddForm.controls['purchase_date'].disable();
        this.productAddForm.controls['supplier'].disable();
        this.productAddForm.controls['purchasing_price'].disable();
        this.productAddForm.controls['insurance_expiration_date'].disable();
        this.productAddForm.controls['child_status'].disable();
        this.productAddForm.controls['total_amount'].disable();
        this.productAddForm.controls['description'].disable();
        this.productAddForm.controls['parent_type'].disable()
        this.productAddForm.controls['noDiscount'].disable()
        this.categories = []
        this.categories.push(json['category'])
        this.images = JSON.parse(JSON.stringify(json['images']))
        this.documents = JSON.parse(JSON.stringify(json['documents']))
        break;
      }
    }
  }
  createChild(payload) {
    payload['documents'] = JSON.parse(JSON.stringify(this.documents))
    payload['images'] = JSON.parse(JSON.stringify(this.images))
    this.ps.createChildProduct(payload).subscribe(data => {
      if (data.response_code < 500) {
        this.ps.myCreateChildProduct(payload['id'], payload['serial_number'], payload['parent_id']);
        this.ps.setMessage('', 'Success');
        // this.askForNew = true;
        // this.askForDelete = false;
        this.addNewChild();
      } else {
        let server_error_msg = '';
        switch (data.response_code) {

          case 520:
            // CREATE_CHILD_NO_PARENT_ERROR
            server_error_msg = 'child parent product does not exist';
            break;

          case 521:
            // CREATE_CHILD_DUPLICATE_ID_ERROR
            server_error_msg = 'barcode already in use';
            break;

          case 522:
            // CREATE_CHILD_MULTIPLE_GENERIC_CHILDREN_ERROR
            server_error_msg = 'generic product only allowed one barcode';
            break;
          case 522:
            // CREATE_CHILD_NO_PARENT_TYPE_ERROR
            server_error_msg = 'parent_type is empty';
            break;

        }
        this.ps.setMessage('', server_error_msg, { error: true });
        this.handleFailedCreateChild();
      }
    })
  }
  newDocumentsDelete(index) {
    this.documents.splice(index, 1)
  }
  newImagesDelete(index) {
    this.images.splice(index, 1)
  }
  editChild(payload) {
    this.ps.updateChildProduct(payload).subscribe(data => {
      if (data.response_code < 500) {
        this.ps.setMessage('', 'Success');
        this.askForNew = false
        this.askForDelete = false;
        this.router.navigate(['../main/products/view/' + this.ps.selectedProduct['id']])
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }

  viewImage(buttonName, row) {
    console.log(row)
;
    this.ps.getChildProductImages('' + row['id']).subscribe(data => {
      if (data.response_code < 500) {
    ;
        console.log(data.data.document);
        this.docView = data.data['image'];
        console.log(this.docView)
        this.showDoc = true;
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })

  }

  deleteImage(buttonName, row) {
    console.log(row)
    this.ps.deleteImage({ id: row['id'] }).subscribe(data => {
      if (data.response_code < 500) {
        for (let i = 0; i < this.images.length; i++) {
          if (this.images[i]['id'] == row['id']) {
            this.images.splice(i, 1);
            this.images = JSON.parse(JSON.stringify(this.images))
            this.ps.setMessage('', 'Success');
            return;
          }
        }
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }
  viewDocument(buttonName, row) {
    console.log(row)
    this.showDoc = false;
    this.ps.getChildProductDocuments(row['id']).subscribe(data => {
  ;
      if (data.response_code < 500) {
        let doc = JSON.parse(JSON.stringify(data.data));
        this.docView = data.data['document'];
        this.showDoc = true;
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }

  deleteDocument(buttonName, row) {
    console.log(row)
    this.ps.deleteDocument({ id: row['id'] }).subscribe(data => {
      if (data.response_code < 500) {
        for (let i = 0; i < this.documents.length; i++) {
          if (this.documents[i]['id'] == row['id']) {
            this.documents.splice(i, 1);
            this.documents = JSON.parse(JSON.stringify(this.documents))
            this.ps.setMessage('', 'Success');
            return;
          }
        }
      } else {
        this.ps.setMessage('', 'Server Error', { error: true });
      }
    })
  }
  submitForm() {
    let arr = Object.keys(this.productAddForm.value);
    for (let i = 0; i < arr.length; i++) {
      this.productAddForm.controls[arr[i]].markAsTouched();
    }
    // this.productAddForm.controls['id'].markAsDirty();
    console.log(this.productAddForm)

    if (this.productAddForm.value.id.length != 12) {
      this.productAddForm.controls['id'].setErrors({
        maxlength: true,
        minlength: true
      });
    }

    if (this.productAddForm.controls.serial_number.valid && this.productAddForm.controls.category.valid
      && this.productAddForm.controls.purchasing_price.valid
      && this.productAddForm.controls.id.valid && this.productAddForm.value.id.length == 12
    ) {
      switch (this.type) {
        case 'new': {
          const payload = JSON.parse(JSON.stringify(this.productAddForm.value));
          payload['purchasing_price'] = Number(payload['purchasing_price'])
          payload['status'] = 1;
          payload['remarks'] = JSON.parse(JSON.stringify(this.remarks));;
          payload['serial_code'] = payload['serial_number'];
          payload['parent_id'] = this.action;
          this.createChild(payload);
          break;
        }
        case 'edit': {
          const payload = JSON.parse(JSON.stringify(this.productAddForm.value));
          payload['status'] = 1;
          payload['old_id'] = this.childId;
          payload['serial_number'] = this.serial_number;
          payload['purchasing_price'] = Number(payload['purchasing_price'])
          payload['status'] = 1;
          payload['parent_id'] = this.ps.selectedProduct['id'];
          this.editChild(payload);
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
          //     this.router.navigate(['../main/customers/table']);
          //   }
          // }) 
          break;
        }
      }
    }

  }
  quickAdd() {
    this.submitForm();
  }
  addRemark(e) {

    switch (this.type) {
      case 'new': {
    ;
        this.remarks.unshift({ text: e.remark });
        break;
      }
      default: {
        let payload = {
          remark: e.remark,
          wraper_id: this.childId
        }
        this.ps.addChildProductRemark(payload).subscribe(data => {
      ;
          if (data.response_code < 500) {
            this.remarks.unshift({
              text: e.remark,
              date: data.data.date,
              id: data.data.id,
              user_name: data.data.user_name
            });
            this.remarks = [...this.remarks];
            this.ps.setMessage('', 'Success');
          } else {
            this.ps.setMessage('', 'Server Error', { error: true });
          }
        })
      }
    }

  }

}
