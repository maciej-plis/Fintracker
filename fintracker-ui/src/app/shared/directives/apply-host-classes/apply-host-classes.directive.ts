import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appApplyHostClasses]'
})
export class ApplyHostClassesDirective implements OnInit, OnDestroy {

  private readonly elRef = inject(ElementRef<HTMLElement>);
  private readonly parentElRef = inject(ElementRef<HTMLElement>, { skipSelf: true });

  private classObserver?: MutationObserver;

  public ngOnInit(): void {
    this.classObserver = new MutationObserver(mutations => mutations.forEach(() => this.applyParentClasses()));
    this.classObserver.observe(this.parentElRef.nativeElement, { attributes: true, attributeFilter: [ 'class' ] });
  }

  public ngOnDestroy(): void {
    this.classObserver && this.classObserver.disconnect();
  }

  private applyParentClasses(): void {
    this.elRef.nativeElement.className = this.parentElRef.nativeElement.className;
  }
}
