import { NgModule, ModuleWithProviders } from '@angular/core';
import { ClickOutsideModule, SanitizerModule } from './modules';
import { has, invoke } from 'lodash';

const SHARED_MODULES = [
    ClickOutsideModule,
    SanitizerModule
];

@NgModule({
    exports: [
        SHARED_MODULES
    ],
    imports: [
        SHARED_MODULES
    ]
})
export class NgBlocksModule {
     // tslint:disable-next-line:function-name
     public static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgBlocksModule,
            providers: SHARED_MODULES.filter(m => has(m, 'forRoot')).map(m => invoke(m, 'forRoot').providers)
        };
    }
}