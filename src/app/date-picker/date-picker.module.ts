import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerService } from './date-picker.service';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule,
   MatNativeDateModule, MatButtonModule  } from "@angular/material";
@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [DatePickerComponent],
  providers: [DatePickerService]
})
export class DatePickerModule { }
