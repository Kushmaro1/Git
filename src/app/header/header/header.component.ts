import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() user: Object;
  @Input() logout: any;
  @Input() header: any;
  @Input() parent:any;
  date
  time
  constructor() { 
    console.log(1)
  }

  ngOnInit() {
    window.requestAnimationFrame(this.getTime.bind(this));
  }
  getTime(){
    let d = new Date();
    this.date = d.toDateString();
    this.time = d.toTimeString().split(' ')[0];
    window.requestAnimationFrame(this.getTime.bind(this))
  }
}
