//tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizePipe } from '../../../src';

class BaseComponent {
    @Input()
    public data: string;
}

@Component({
    selector: 'clean-html',
    template: `
        <div [innerHtml]="data | sanitize:'html'"></div>
    `
})
class SanitizeHtmlComponent extends BaseComponent { }

@Component({
    selector: 'clean-url',
    template: `
        <img [src]="data | sanitize:'url'">
    `
})
class SanitizeUrlComponent extends BaseComponent { }

@Component({
    selector: 'clean-resource',
    template: `
        <img [src]="data | sanitize:'resource'">
    `
})
class SanitizeResourceUrlComponent extends BaseComponent { }

@Component({
    selector: 'clean-style',
    template: `
        <div [style]="data | sanitize:'style'"></div>
    `
})
class SanitizeStyleComponent extends BaseComponent { }

describe('SanitizePipe', () => {
    let domSanitizer: DomSanitizer;

    function setupFixture<T>(componentType: Type<T>): ComponentFixture<T> {
        const fixture: ComponentFixture<T> = TestBed.configureTestingModule({
            declarations: [
                SanitizePipe,
                componentType
            ]
        }).createComponent(componentType);
        domSanitizer = TestBed.get(DomSanitizer);
        return fixture;
    }

    it('should call bypassSecurityTrustHtml', () => {
        const fixture: ComponentFixture<SanitizeUrlComponent> = setupFixture(SanitizeHtmlComponent);
        jest.spyOn(domSanitizer, 'bypassSecurityTrustHtml');
        fixture.componentInstance.data = 'somehtml';
        fixture.detectChanges();
        expect(domSanitizer.bypassSecurityTrustHtml).toBeCalledWith('somehtml');
    });

    it('should call bypassSecurityTrustResourceUrl', () => {
        const fixture: ComponentFixture<SanitizeResourceUrlComponent> = setupFixture(SanitizeResourceUrlComponent);
        jest.spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl');
        fixture.componentInstance.data = 'someurl';
        fixture.detectChanges();
        expect(domSanitizer.bypassSecurityTrustResourceUrl).toBeCalledWith('someurl');
    });

    it('should call bypassSecurityTrustStyle', () => {
        const fixture: ComponentFixture<SanitizeStyleComponent> = setupFixture(SanitizeStyleComponent);
        jest.spyOn(domSanitizer, 'bypassSecurityTrustStyle');
        fixture.componentInstance.data = 'somestyle';
        fixture.detectChanges();
        expect(domSanitizer.bypassSecurityTrustStyle).toBeCalledWith('somestyle');
    });

    it('should call bypassSecurityTrustUrl by default', () => {
        const fixture: ComponentFixture<SanitizeUrlComponent> = setupFixture(SanitizeUrlComponent);
        jest.spyOn(domSanitizer, 'bypassSecurityTrustUrl');
        fixture.componentInstance.data = 'someurl';
        fixture.detectChanges();
        expect(domSanitizer.bypassSecurityTrustUrl).toBeCalledWith('someurl');
    });
});