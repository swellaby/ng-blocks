import { NgModule } from '@angular/core';
import { SanitizePipe } from './sanitize-pipe';

const DECLARATIONS = [
    SanitizePipe
];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS
})
export class SanitizerModule {}