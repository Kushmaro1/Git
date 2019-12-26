import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslatorModule } from './translator/translator.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './shared/sevices/http-interceptor-providers.service';
import { AppRoutingModule } from './routerConfig';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule, lightTheme, darkTheme, portraitTheme, landscapeTheme } from './theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslatorModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme, portraitTheme, landscapeTheme],
      active: ['light-c','landscape-o']
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
