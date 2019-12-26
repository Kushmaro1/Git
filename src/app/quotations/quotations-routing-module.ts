import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationsHomeComponent } from './quotations-home/quotations-home.component';
import { QuotationsTableComponent } from './quotations-home/quotations-table/quotations-table.component';
import {NewQuotationsComponent} from './quotations-home/new-quotations/new-quotations.component';

const routes: Routes = [
    {path: '', component:QuotationsHomeComponent,
       children: [
        {path: '', redirectTo:'create',pathMatch:'full'},
        {path: 'table', component:QuotationsTableComponent},
        {path:'newc', component:NewQuotationsComponent}
      ]
   },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class QuotationsRoutingModule {
}
