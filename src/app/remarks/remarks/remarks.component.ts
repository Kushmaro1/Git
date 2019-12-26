import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Globals } from 'src/app/translator/class/globals.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemarksComponent implements OnInit {

  @Input() remarks:any;
  @Output() newRemark = new EventEmitter<any>(); 
  remarksForm: any;

  constructor(
    private fb: FormBuilder,
    public glob : Globals,
  ) { }

  ngOnInit() {
    this.remarks = this.remarks || [];
    this.remarksForm = this.fb.group({
      remark:['']
    })
  }
  submitRemark(){
    this.newRemark.emit(this.remarksForm.value);
    this.remarksForm.controls.remark.setValue('');
  }

}
