import { Theme } from './symbols';

export const lightTheme: Theme = {
  name: 'light-c',
  properties: {
    // var(--mainBackground,#F1F7FC);
    // var(--mainHeaderBackground,#FFFFFF);
    // var(--mainInputBackground,#F6F6F6);
    // var(--mainFont,#3B3B3B);
    // var(--secondaryBackground,#4098FE);
    // var(--mainShadow,box-shadow: 0 2px 4px rgba(0,0,0,.2));
    // var(--mainShadow,box-shadow: 0px 1px 2px rgba(0,0,0,0.2));
 
    '--mainBackground': '#F1F7FC',
    '--mainBackgroundImage': 'linear-gradient( #9f67a0, #253544)',
    '--mainHeaderBackground': '#FFFFFF',
    '--mainInputBackground': '#F6F6F6',
    '--mainFont': '#3B3B3B',
    '--secondaryBackground': '#4098FE',
    // '--mainShadow':'0 2px 4px rgba(0,0,0,.2)'
    '--mainShadow':'0px 1px 2px rgba(0,0,0,0.2)'
  }
};


// lightskyblue