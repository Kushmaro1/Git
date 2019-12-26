import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.less']
})
export class ProductsHomeComponent implements OnInit {
  name='Products'
  constructor( public ps :ProductsService) {
    this.ps.start()
   }

  ngOnInit() {
  }

}
