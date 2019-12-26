import { Injectable, Inject, EventEmitter } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme } from './symbols';

@Injectable()
export class ThemeService {
  // pastTheme
  themeChange = new EventEmitter<Theme>();
  setTextAlignment = new EventEmitter<String>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string[]
  ) {}

  getActiveThemes(activeThemes: any) {
    const theme=[]
    for(let i=0;i<this.themes.length;i++){
         if(  this.themes[i].name=== activeThemes[0] || this.themes[i].name === activeThemes[1]){
           theme.push( this.themes[i])
         }
    }
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
  //  // console.log(theme)
    return theme;
  }
  getSingleTheme(name: string) {
    const theme=this.themes.find((t) => {return t.name === name }) 
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
    return theme;
  }

  getActiveTheme() {
    if (this.theme) {
      return this.getActiveThemes(this.theme);
    }
  }

  getProperty(propName: string) {
    let arr=this.getActiveTheme()
    for(let i=0;i<arr.length;i++){
          if(arr[i].properties[propName]){
            return arr[i].properties[propName]
          }
    }
    return null;
  }

  setTheme(name: string) {
    // this.pastTheme=this.theme
    let arr=name.split('-')
    if(arr[1] == 'o'){
      this.theme[1] = name;
      this.themeChange.emit(this.getActiveTheme()[1]);
    }
    if(arr[1] == 'c'){
      this.theme[0] = name;
      this.themeChange.emit(this.getActiveTheme()[0]);
    }
  }

  registerTheme(theme: Theme) {
    this.themes.push(theme);
  }
  setLangAlignment(name){
    // console.log(name)
    switch(name){
    case 'Hebrew':{
      this.setTextAlignment.emit('Hebrew')
      break;
    }
    case 'English':{
      this.setTextAlignment.emit('English')
      break;
    }
    }
  }
  updateTheme(name: string, properties: { [key: string]: string; }) {
    const theme = this.getSingleTheme(name);
    theme.properties = {
      ...theme.properties,
      ...properties
    };

    if (name === this.theme[0]) {
      this.themeChange.emit(theme);
    }
  }

}