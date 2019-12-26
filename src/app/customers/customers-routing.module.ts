
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersHomeComponent } from './customers-home/customers-home.component';
import { CustomersAddComponent } from './customers-home/customers-add/customers-add.component';
import { CustomersViewComponent } from './customers-home/customers-view/customers-view.component';
import { CustomersTableComponent } from './customers-home/customers-table/customers-table.component';
const routes: Routes = [
    {path: '', component:CustomersHomeComponent,
       children: [
        {path: '', redirectTo:'table',pathMatch:'full'},
        {path: 'table', component:CustomersTableComponent},
        {path: 'add/:value', component:CustomersAddComponent},
        {path: 'edit/:value', component:CustomersAddComponent},
        {path: 'view/:value', component:CustomersViewComponent}
      ]
   },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CustomersRoutingModule {
}
