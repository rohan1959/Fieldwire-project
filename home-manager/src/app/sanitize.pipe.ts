import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

class SafeResourceStyle {
}

@Pipe({
  name: 'sanitizeStyle'
})
export class SanitizeStyle implements PipeTransform  {

  constructor(private _sanitizer: DomSanitizer){}

  transform(url: string) : SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
}
