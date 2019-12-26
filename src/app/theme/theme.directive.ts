import { Directive, OnInit, OnDestroy, ElementRef, Inject, Input } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols'
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  /**
   * Whether the styles are scoped or not.
   */
  @Input() scoped = true;

  private _destroy$ = new Subject();

  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeService,
    @Inject(DOCUMENT) private _document: any
  ) {}

  ngOnInit() {
    const active = this._themeService.getActiveTheme();
   // console.log(active)
    if (active) {
      this.updateTheme(active[0]);
      this.updateTheme(active[1]);
    }

    this._themeService.themeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
    this._themeService.setTextAlignment
      .pipe(takeUntil(this._destroy$))
      .subscribe((value: String) => this.setTextAlignment(value));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Update the theme on the scoped element.
   */
  updateTheme(theme: Theme) {
 //   // console.log(theme)
    // console.log(this._themeService.themes)
    const element = this.getElement();
    let arr= theme.name.split('-')
    // project properties onto the element
    for (const key in theme.properties) {
      element.style.setProperty(key, theme.properties[key]);
    }

    // remove old theme
    let arr2=[]
    for (const name of this._themeService.themes) {
      arr2=name.name.split('-');
     if(arr[1] == arr2[1]){
       element.classList.remove(`${name.name}-theme`);
     } 
    }
    // if(this._themeService.pastTheme){
    //   let name=this._themeService.pastTheme.name;
    // console.log(name)
    //   element.classList.remove(`${name}-theme`);
    // }
    // alias element with theme name
    element.classList.add(`${theme.name}-theme`);
  }
  setTextAlignment(value){
    const element = this.getElement();
    switch(value){
      case 'Hebrew':{
        element.style.setProperty('--myAlignment', 'rigth');
        element.style.setProperty('--myDirection', 'rtl');
        break;
      }
      case 'English':{
        element.style.setProperty('--myAlignment', 'left');
        element.style.setProperty('--myDirection', 'ltr');
        break;
      }
    }
    
  } 
  /**
   * Element to attach the styles to.
   */
  getElement() {
    return this.scoped ? this._elementRef.nativeElement : this._document.body;
  }

}