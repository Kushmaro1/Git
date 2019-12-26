import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/translator/class/globals.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.less']
})
export class ProductsTableComponent implements OnInit {
  // _destroy$: any;

  productsTableForm: FormGroup;
  subscribtions = []
  isAdminUse = (sessionStorage.getItem('userPermission') ===  'admin');

  buttonIcon = this.isAdminUse ? { 'Edit': true, "View": true } :{ "View": true } ;
  buttonIconClass = this.isAdminUse ? { "View": "fas fa-eye", "Edit": "fas fa-pencil-alt" }:{ "View": "fas fa-eye" } ;
  buttons =  this.isAdminUse ?  { "View": "viewProduct", "Edit": "editProduct" }:{ "View": "viewProduct", } ;  


  
  public tableStructure = {
    tableName: 'Products Table',
    print: true,
    rowsperpage: 8,
    // editable:[],
    searchable: [],
    // sortAs:{
    //   create_date_time_original:'date',
    // },
    // addEntry:true,
    buttonIcon: this.buttonIcon,

    buttonIconClass: this.buttonIconClass,
    buttons: this.buttons,

    aliaces: {
      'id': "SKU",
      'name': "Product Name",
      'category': "Category",
      'total': "Units in Stock",
      'avilable': "Units Available",

    },
    headers: [
      'id',
      'name',
      'category',
      'total',
      'available',
    ],
    eclipsis: {
      company_id: true,
      name: true,
      phone: true,
      email: true,

    },
  };



  public ParentProductsTableData = [];
  public instance: ProductsTableComponent;
  public myStyle = {
    actionsMenu: {
      'min-width': 'calc(4vw)',
      // 'max-width':'calc(4vw)',
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public glob: Globals,
    public ps: ProductsService
  ) {
    this.instance = this;
  }

  ngOnInit() {
    console.log(this.ps.messs)
    this.ps.messs.setSubNav.emit('Products Table');
    this.productsTableForm = this.fb.group({
      searchProducts: [''],
      date_from: [''],
      date_to: ['']
    });
    this.subscribtions.push({})
    this.subscribtions[this.subscribtions.length - 1] = this.ps.sock.dataLoaded.subscribe(data => {
      if (data == 'products') {

        this.searchProducts();
      }
    })
    this.searchProducts();
  }

  searchProducts() {
    // let category = this.ps.categoriesMap.get(this.customerTableForm.value['category'])

    let ParentProductsTableData = this.ps.sock.allProducts || [];
    let searchProducts = this.productsTableForm.value['searchProducts'].toLowerCase();
    if (searchProducts == '') {
      this.ParentProductsTableData = []
      for (let i = 0; i < ParentProductsTableData.length; i++) {
        let temp = JSON.parse(JSON.stringify(ParentProductsTableData[i]))
        temp['category'] = this.ps.categoriesMapReverse.get(temp['category']) == undefined ? temp['category'] : this.ps.categoriesMapReverse.get(temp['category']);
        this.ParentProductsTableData.push(temp)
      }
    } else {
      if (searchProducts.length == 12) {
        this.ps.getChildProductsById(searchProducts).subscribe(data => {
          if (data.response_code < 500) {
            let json = JSON.parse(JSON.stringify(data.data));
            // let json=JSON.parse(JSON.stringify(this.ps.selectedProduct));
            // json['category'] = this.ps.categoriesMapReverse.get(json['category']) || json['category']
            if (json != null && json != undefined) {
              this.router.navigate(['../main/products/child/view/' + searchProducts]);
            }
          } else {
            this.ParentProductsTableData = [];
          }
        });
      } else {
        this.ParentProductsTableData = []
        for (let i = 0; i < ParentProductsTableData.length; i++) {
          if (ParentProductsTableData[i]['id'].toLowerCase().indexOf(searchProducts) == 0 || ParentProductsTableData[i]['name'].toLowerCase().indexOf(searchProducts) > -1) {
            let temp = JSON.parse(JSON.stringify(ParentProductsTableData[i]))
            temp['category'] = this.ps.categoriesMapReverse.get(temp['category']) == undefined ? temp['category'] : this.ps.categoriesMapReverse.get(temp['category']);
            this.ParentProductsTableData.push(temp)
          }
        }
        // console.log(this.ParentProductsTableData)
        this.ParentProductsTableData = JSON.parse(JSON.stringify(this.ParentProductsTableData))
      }
    }

  }
  viewProduct(buttonName, row) {
    this.ps.selectProduct(row['id'])
    this.router.navigate(['../main/products/view/' + row['id']]);
  }
  editProduct(buttonName, row) {
    // console.log(row)
    this.ps.selectProduct(row['id'])
    this.router.navigate(['../main/products/edit/' + row['id']]);
  }
  addNew() {
    this.router.navigate(['../main/products/add/' + 'new']);
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe()
    }
  }

}

