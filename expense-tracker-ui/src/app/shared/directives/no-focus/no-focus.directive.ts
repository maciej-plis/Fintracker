import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[noFocus]'
})
export class NoFocusDirective {

  private readonly elRef = inject(ElementRef);

  @HostListener('click') onClick() {
    this.elRef.nativeElement.blur();
  }
}
