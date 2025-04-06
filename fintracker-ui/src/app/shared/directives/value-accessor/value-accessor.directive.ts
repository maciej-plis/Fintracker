import { Directive, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appValueAccessor]',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ValueAccessorDirective),
    multi: true
  } ]
})
export class ValueAccessorDirective<T> implements ControlValueAccessor {

  protected onChangeFn?: (value: T | null) => {};
  protected onTouchedFn?: () => {};

  public readonly value = signal<T | null>(null);
  public readonly disabled = signal(false);

  public valueChanged(value: T | null): void {
    this.onChange(value);
    this.writeValue(value);
  }

  public writeValue(value: T | null): void {
    this.value.set(value);
  }

  public registerOnChange(onChangeFn: (value: T | null) => {}): void {
    this.onChangeFn = onChangeFn;
  }

  public registerOnTouched(onTouchedFn: () => {}): void {
    this.onTouchedFn = onTouchedFn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  public onChange(value: T | null): void {
    this.onChangeFn?.(value);
  }

  public onTouched(): void {
    this.onTouchedFn?.();
  }
}
