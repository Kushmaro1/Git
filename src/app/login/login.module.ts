import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { TranslatorModule } from '../translator/translator.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatorModule,
    HeaderModule
  ],
  declarations: [LoginComponent],
  providers : [LoginService]
})
export class LoginModule {}