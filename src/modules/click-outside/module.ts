import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './directive';

const DECLARATIONS = [
    ClickOutsideDirective
];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS
})
export class ClickOutsideModule {}