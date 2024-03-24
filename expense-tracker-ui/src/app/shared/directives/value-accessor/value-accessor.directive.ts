import { Directive, forwardRef, signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appValueAccessor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ValueAccessorDirective),
    multi: true
  }]
})
export class ValueAccessorDirective<T> implements ControlValueAccessor {

  public onChange: (value: T | null) => {};
  public onTouched: () => {};

  public value: WritableSignal<T | null> = signal(null);
  public disabled: WritableSignal<boolean> = signal(false);

  public writeValue(value: T | null): void {
    this.value.set(value);
  }

  public registerOnChange(onChangeFn: (value: T | null) => {}): void {
    this.onChange = onChangeFn;
  }

  public registerOnTouched(onTouchedFn: () => {}): void {
    this.onTouched = onTouchedFn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
