import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quotations-home',
  templateUrl: './quotations-home.component.html',
  styleUrls: ['./quotations-home.component.less']
})
export class QuotationsHomeComponent implements OnInit {
  name='Quotations'

  @Output() dateObj:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
