import { ThemeDirective } from './theme.directive';
import {TestBed} from '@angular/core/testing';
import { Directive, OnInit, OnDestroy, ElementRef, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// describe('ThemeDirective', () => {
//   it('should create an instance', () => {
//     private _elementRef: ElementRef,
//     private _themeService: ThemeService,
//     @Inject(DOCUMENT) private _document: any
//     const directive = new ThemeDirective( 
//     );
//     expect(directive).toBeTruthy();
//   });
// });
describe('Directive: ThemeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeDirective]
    });
  });
});
