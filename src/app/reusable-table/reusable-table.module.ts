import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { PrintTableToPdfService } from './services/print-table-to-pdf.service';
import { TranslatorModule } from '../translator/translator.module';
import { DatePickerModule } from '../date-picker/date-picker.module';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    TranslatorModule,
    DatePickerModule
  ],
  exports: [TableComponent],
  providers:[PrintTableToPdfService]
})
export class ReusableTableModule { }
