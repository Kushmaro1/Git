import { Theme } from './symbols';

export const landscapeTheme: Theme = {
  name: 'landscape-o',
  properties: {
       // var(--width1,85.4vw);
    // var(--margin1,12px 0 0);
    // var(--margin2,2.4vh 10px 2.3vh 7.5vw);
    // var(--height1,75vh);
    // var(--height2,17vh);
    // var(--display,block);
    '--width1': '85.4vw',
    '--height1': 'calc(100vh - 9.8vw - 100px)',
    '--height2': '2vw',
    '--height3': 'calc(97vh - 9.8vw - 100px)',
    '--display': 'block',
    '--display2': 'none',
    '--margin1': '0 auto 0',
    '--margin2': '10px 10px 0 7.5vw',
  }
};


