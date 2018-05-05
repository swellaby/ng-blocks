import { Directive, ElementRef, Output, EventEmitter, HostListener, Inject } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(@Inject(ElementRef) private elementRef : ElementRef) {}

    /**
     * Emits events when an outside element is clicked
     * @type {EventEmitter<MouseEvent>}
     * @memberof ClickOutsideDirective
     */
    @Output()
    public clickOutside: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Triggered on any click in the browser
     * @param {MouseEvent} event
     * @param {HTMLElement} targetElement
     * @memberof ClickOutsideDirective
     */
    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!this.elementRef.nativeElement.contains(targetElement)) {
            this.clickOutside.emit(event);
        }
    }
}