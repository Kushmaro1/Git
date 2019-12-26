import { LanguagePipe } from './lang.pipe';
import {TranslatorService} from '../service/translator.service';
import { ChangeDetectorRef } from '@angular/core';
describe('LanguagePipe', () => {
  it('create an instance', () => {
    let translator:TranslatorService
    let detectref:ChangeDetectorRef
    const pipe = new LanguagePipe(detectref,translator);
    expect(pipe).toBeTruthy();
  });
});
