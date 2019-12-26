import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatorModule } from '../translator/translator.module';
import { ReusableTableModule } from '../reusable-table/reusable-table.module';
import { ProductsService } from './products.service';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsTableComponent } from './products-home/products-table/products-table.component';
import { ProductsAddParentComponent } from './products-home/products-add-parent/products-add-parent.component';
import { ChildProductAddComponent } from './products-home/child-product-add/child-product-add.component';
import { SafeResouceUrlPipe } from './pipes/safe-resouce-url.pipe';
import { RemarksModule } from '../remarks/remarks.module';


@NgModule({
  declarations: [ProductsHomeComponent, ProductsTableComponent, ProductsAddParentComponent, ChildProductAddComponent, SafeResouceUrlPipe],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    RemarksModule,
    ReactiveFormsModule,
    TranslatorModule,
    ReusableTableModule
  ],
  providers:[ProductsService],
  exports:[SafeResouceUrlPipe]
})
export class ProductsModule { }