import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeResouceUrl'
})
export class SafeResouceUrlPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
  transform(html) {
    //  let s=this.sanitizer.bypassSecurityTrustHtml(html)
     //return this.sanitizer.sanitize(1,this.sanitizer.bypassSecurityTrustHtml(html))
     // this.sanitizer.bypassSecurityTrustUrl(html);
     return this.sanitizer.bypassSecurityTrustResourceUrl(html)
    }

}