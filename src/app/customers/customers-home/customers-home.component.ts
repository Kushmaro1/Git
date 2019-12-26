import { Component, OnInit } from '@angular/core';
import { Globals } from '../../translator/class/globals.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-home',
  templateUrl: './customers-home.component.html',
  styleUrls: ['./customers-home.component.less']
})
export class CustomersHomeComponent implements OnInit {
  name='Customers'
  constructor(
    public cs :CustomerService,
    public glob : Globals,
  ) {
    this.cs.start();
   }

  ngOnInit() {
  }

}
