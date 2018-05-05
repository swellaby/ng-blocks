import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideModule } from '../../../src';

@Component({
    selector: 'test-component',
    template: `
        <div class="one" (clickOutside)="testMethod()">
            <div class="inside"></div>
        </div>
        <div class="two"></div>
    `
})
class TestComponent {
    @Input()
    public testMethod: () => void;
}

describe('ClickOutsideDirective', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ClickOutsideModule]
        }).createComponent(TestComponent);
        fixture.componentInstance.testMethod = jest.fn();
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('does not fire when clicking element', () => {
        fixture.debugElement.query(By.css('.one')).nativeNode.click();
        expect(fixture.componentInstance.testMethod).not.toHaveBeenCalled();
    });

    it('does not fire when clicking child element', () => {
        fixture.debugElement.query(By.css('.inside')).nativeNode.click();
        expect(fixture.componentInstance.testMethod).not.toHaveBeenCalled();
    });

    it('does fire when different element that is not child', () => {
        fixture.debugElement.query(By.css('.two')).nativeNode.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.testMethod).toHaveBeenCalled();
    });
});