import { Inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

    constructor(@Inject(DomSanitizer) private sanitizer: DomSanitizer) { }

    public transform(value: string, bypassType: string): SafeUrl | SafeResourceUrl {
        switch (bypassType) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'resource':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            default:
                return this.sanitizer.bypassSecurityTrustUrl(value);
        }
    }
}