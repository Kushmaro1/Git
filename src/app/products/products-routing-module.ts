
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsTableComponent } from './products-home/products-table/products-table.component';
import { ProductsAddParentComponent } from './products-home/products-add-parent/products-add-parent.component';
import { ChildProductAddComponent } from './products-home/child-product-add/child-product-add.component';
const routes: Routes = [
    {path: '', component:ProductsHomeComponent,
       children: [
        {path: '', redirectTo:'table',pathMatch:'full'},
        {path: 'table', component:ProductsTableComponent},
        {path: 'add/:value', component:ProductsAddParentComponent,data:{type:'new'}},
        {path: 'edit/:value', component:ProductsAddParentComponent,data:{type:'edit'}},
        {path: 'view/:value', component:ProductsAddParentComponent,data:{type:'view'}},
        {path: 'child/view/:value', component:ChildProductAddComponent,data:{type:'view'}},
        {path: 'child/edit/:value', component:ChildProductAddComponent,data:{type:'edit'}},
        {path: 'child/add/:value', component:ChildProductAddComponent,data:{type:'new'}},
//         {path: 'view/:value', component:CustomersViewComponent}
      ]
   },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ProductsRoutingModule {
}
