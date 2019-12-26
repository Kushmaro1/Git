import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersHomeComponent } from './customers-home/customers-home.component';
import { TranslatorModule } from '../translator/translator.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersTableComponent } from './customers-home/customers-table/customers-table.component';
import { CustomersAddComponent } from './customers-home/customers-add/customers-add.component';
import { CustomersViewComponent } from './customers-home/customers-view/customers-view.component';
import { ReusableTableModule } from '../reusable-table/reusable-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { SocketModule } from '../socket/socket.module';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { RemarksModule } from "../remarks/remarks.module";
@NgModule({
  declarations: [CustomersHomeComponent, CustomersTableComponent, CustomersAddComponent, CustomersViewComponent],
  imports: [
    SocketModule,
    RemarksModule,
    CommonModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    TranslatorModule,
    CustomersRoutingModule,
    ReusableTableModule
  ],
  providers:[CustomerService]
})
export class CustomersModule { }
