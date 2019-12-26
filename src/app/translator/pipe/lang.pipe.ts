import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from '../service/translator.service';
import { ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'myTranslator',
  pure: true,
})
export class LanguagePipe implements PipeTransform {
  constructor(private ref: ChangeDetectorRef,private lang:TranslatorService){
  }
 
  transform(value: any,language:string): any {
    return this.lang.getValue(value,language);
  }
}
