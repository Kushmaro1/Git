import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemarksComponent } from './remarks/remarks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatorModule } from '../translator/translator.module';

@NgModule({
  declarations: [RemarksComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatorModule
  ],
  exports:[RemarksComponent]
})
export class RemarksModule { }
