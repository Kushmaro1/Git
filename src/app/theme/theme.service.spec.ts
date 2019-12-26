import { TestBed, inject } from '@angular/core/testing';
import { THEMES, ACTIVE_THEME, ThemeOptions } from './symbols';
import { ThemeService } from './theme.service';
import { ThemeModule } from './theme.module';
import { lightTheme, darkTheme, portraitTheme, landscapeTheme } from '.';

describe('ThemeService', () => {
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [
      ThemeModule.forRoot({
        themes: [lightTheme, darkTheme, portraitTheme, landscapeTheme],
        active: ['dark-c','landscape-o']
      })
      ]
    });
    
  });

  it('should be created',inject([ACTIVE_THEME,THEMES,ThemeService], (service: ThemeService) => {
    expect(service).toBeTruthy();
  }));
});
