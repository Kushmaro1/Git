import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
// import { httpInterceptorProviders } from '../shared/services/http-interceptor-providers.service';
// import { ThemeModule } from '../theme/theme.module';
// import {  darkTheme } from '../theme/dark-theme';
// import {  lightTheme } from '../theme/light-theme';
// import { portraitTheme } from '../theme/portrait-theme';
// import { landscapeTheme } from '../theme/landscape-theme';
// import { SocketService } from '../shared/services/socket.service';
// import { EventBusService } from '../shared/services/event-bus.service';
import { MainRoutingModule } from './main-routing.module';
import { TranslatorModule } from '../translator/translator.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslatorModule,
    HeaderModule
  ],
  declarations: [MainComponent],
  providers: [
    // SocketService,
    // EventBusService,
    // WebRTCService
  ],
})
export class MainModule { }
