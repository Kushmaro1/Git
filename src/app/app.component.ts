import { Component, HostListener } from '@angular/core';
import {version} from './shared/version';
import { TranslatorService } from './translator/service/translator.service';
import { Globals } from './translator/class/globals.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from './theme';
// import { ThemeService } from './theme';
import { AuthService } from './shared/sevices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  show=true;
  langForm: FormGroup;
  languages: Map<any, any>;
  version: string;
  window:Window=window;
  constructor(
    // private themeService: ThemeService,
    // private ws : WidgetService,
    public glob : Globals,
    private fb: FormBuilder,
    public lang:TranslatorService,
    private themeService: ThemeService,
    private authService: AuthService
    // public cs: CommonsService
   ){
   //  // console.log(glob)
    this.languages=this.lang.getAllowedLanguages()
  //  // console.log(this.languages)
  }

  
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  resetTimer() {
    this.authService.notifyUserAction();
  }
 ngOnInit() {
  this.langForm = this.fb.group({
    language: ['English'],
  });
  this.langForm.controls.language.valueChanges.subscribe(data=>{
    // console.log(data)
    this.show=false;
    this.themeService.setLangAlignment(data);
    this.lang.changeLanguage(data)
    window.requestAnimationFrame(function(){
      this.show=true;
    }.bind(this))
   
  })
  this.version=version;
  // window.addEventListener('beforeunload', function (e) {
  //   // Cancel the event
  //   e.preventDefault();
  //   // Chrome requires returnValue to be set
  //   e.returnValue = "Dude, are you sure you want to refresh? Think of the kittens!";
  //   // this.confirm("Dude, are you sure you want to refresh? Think of the kittens!");
  // });
  window.addEventListener('offline', function(e) { 
    console.log('offline'); 
  });

  window.addEventListener('online', function(e) { 
    console.log('online'); 
  });
  window.onfocus = this.windowActive.bind(this);
  window.onblur =  this.windowInactive.bind(this);
  this.version=version;
 }
 windowActive() {
  // this.cs.focus = true;
  // this.cs.focusChange.emit(true)
 }
 windowInactive() {
  // this.cs.focus = false;
  // this.cs.focusChange.emit(false)
 }
}


