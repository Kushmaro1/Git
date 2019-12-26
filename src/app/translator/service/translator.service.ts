import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable, of
} from 'rxjs';
import {
  http,
  RestURL
} from '../../shared/constants';
import { EventEmitter } from '@angular/core';
import { Globals } from '../class/globals.service';
import { hebrew } from '../languges/hebrew';
import { english } from '../languges/english';
@Injectable({
  providedIn: 'root'
})

export class TranslatorService {

  static DEFAULT_LANGUAGE: string = "English";
  public newLang: EventEmitter<any> = new EventEmitter<any>();
  private currentLang = ''
  private currentLanguage = new Map();
  private defaultLanguage = new Map();
  private allowedLanguages = new Map();
  constructor(
    private httpClient: HttpClient,
    public glob:Globals
  ) {
    // this.getExistingLanguages()
    this.allowedLanguages.set('English',{language_short:'En'});
    this.allowedLanguages.set('Hebrew',{language_short:'Heb'});
    this.setLang(hebrew,'Hebrew');
    this.setLang(english,'English');
   }
   public getValue(value,language){
      //  console.log(language)
      if(typeof(value) == 'string'){
      try{
        value=this.currentLanguage.get(language).get(value) || value
      }
      catch(e){
        value=this.defaultLanguage.get(value.toLowerCase()) || value
      }
      // console.log(value)
      return value
    }
    return value
  }
  // private getExistingLanguages(){
  //     this.getSelectableLanguages().subscribe(data=>{
  //      if(data.response_code==1){

  //        data.result.forEach(item=>{
  //          this.allowedLanguages.set(item.language_name,item)
  //          this.getLanguages(item.language_name)
  //        })
  //        this.getDefaultLanguage(TranslatorService.DEFAULT_LANGUAGE)
  //      }  
  //        // console.log(this.allowedLanguages)
  //     })
  // }
  public getAllowedLanguages(){
    return this.allowedLanguages;
  }
  public getCurrentLanguage(){
    return this.currentLang;
  }
  // private getDefaultLanguage(name){
  //   this.getLanguageById(this.allowedLanguages.get(name)["_id"]).subscribe(data=>{
  //     // console.log(data)
  //     let arr= Object.keys(data.result[0]['dictionary'])
  //     arr.forEach(item=>{
  //      this.defaultLanguage.set(item,data.result[0]['dictionary'][item])
  //     })
  //     // console.log("default:",this.defaultLanguage)
  //   })
  // }
  public changeLanguage(name:string){   
    this.currentLang=name
    this.glob.language=name
    this.newLang.emit(name)
  }
  private setLang(data,name){
        let currentLanguage = new Map();
        let arr= Object.keys(data)
        arr.forEach(item=>{
         currentLanguage.set(item,data[item])
        })
        this.currentLanguage.set(name,currentLanguage)
      
  }
  // getLanguages(name){
  //   if(name != TranslatorService.DEFAULT_LANGUAGE){
  //     this.getLanguageById(this.allowedLanguages.get(name)["_id"]).subscribe(data=>{
  //       if(data.response_code == 1){
  //          this.setLang(data.result[0]['dictionary']);
  //       }
  //    //  // console.log(this.currentLanguage)
  //     })
  //   }else{
  //   }
  // }
  // private getSelectableLanguages(): Observable<any> {
  //   return this.httpClient.get <any>(http+RestURL + 'admin/content/languages/selectable');
  // }
  // private getLanguageById(val): Observable<any> {
  //   return this.httpClient.get <any>(http+RestURL + 'admin/content/languages/'+val);
  // } 
}
