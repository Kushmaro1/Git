import { Component, OnInit, AfterViewInit, AfterContentChecked, Input, Output, EventEmitter } from '@angular/core';
import moment from '../../../assets/js/moment.min.js';
import * as Lightpick from '../../../assets/js/lightpick.js';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  picker
  date
  daysNumber = 0
  @Input() myStyle: Object;
  @Input() parent: any;
  @Input() id: string;
  @Input() prodindex: number;
  @Input() dateRange: string;
  @Output() newDate = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    if (this.dateRange) {
      let dates = this.dateRange.split('_')
      this.date = dates.join(' - ')
      this.setDateRange(dates[0].split('/').reverse().join('/'), dates[1].split('/').reverse().join('/'))
    }
  }
  ngAfterViewInit() {

    let field;
    let _parentEl;
    if (document.getElementById('parentEl' +this.prodindex)  == null 
    || document.getElementById('parentEl' +this.prodindex)  == undefined  ) {
      _parentEl = document.getElementById('parentEl');

    }
    else{
      
       _parentEl =document.getElementById('parentEl' +this.prodindex)
      
       
    }
    this.picker = new Lightpick({
      field:document.getElementById('lPickInY_' + this.id ),
      // secondField: document.getElementById('demo-3_2'),
      parentEl: _parentEl,
      singleDate: false,
      // orientation:'top',
      onClose: function (start, end) {
        var str = '';
        // str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
        // str += end ? end.format('Do MMMM YYYY') : '...';
        // let date = 
        // console.log(date)
        this.date = this.picker.toString('YYYY/MM/DD')
        console.log(this.date)
        this.parseDate(this.date);

        // console.log(this.daysNumber)
        // console.log(date)
        // console.log(this.picker)
        // document.getElementById('result-3').innerHTML = str;
      }.bind(this)
    });
    //  console.log(this.picker)
    //  this.picker.show()
  }

  setDateRange(start, end) {
    if (this.picker) {

      this.picker.setDateRange(start, end)
    } else {
      window.requestAnimationFrame(this.setDateRange.bind(this, start, end))
    }
  }
  getDates() {
    // Return current date as moment object.
    // this.picker.getDate()

    // Return current start of date range as moment object.
    // picker.getStartDate()

    // Return current start of date range as moment object.
    // picker.getEndDate()




  }
  parseDate(str) {
    //  console.log(str)
    // str.split('-')
    let mdy = str.split('-');
    mdy[0] = mdy[0].trim();
    mdy[1] = mdy[1].trim();

    let first = new Date(mdy[0]).getTime()
    let second = new Date(mdy[1]).getTime()
    // return new Date(mdy[2], mdy[0]-1, mdy[1]);
    // console.log(first)
    // console.log(second)
    this.datediff(first, second)
    if (mdy[1] == '...') {
      // this.setDateRange('','')
    } else {
      this.newDate.emit({ id: this.id, date_to: mdy[1], date_from: mdy[0], num_d: this.daysNumber });
    }
  }
  datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    // console.log((second-first)/(1000*60*60*24)+1)
    this.daysNumber = (second - first) / (1000 * 60 * 60 * 24) + 1;

  }
  ngOnDestroy() {
    if (this.picker) {
      this.picker.destroy()
    }
  }
}