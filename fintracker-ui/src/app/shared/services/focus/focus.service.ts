import { Injectable, signal } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  private focusedElement = toSignal(fromEvent(window, 'focusin').pipe(
    map(({target}) => target),
    filter(this.isHtmlElement)
  ), {initialValue: null});

  private _capturedFocusedElement = signal(this.focusedElement());

  public captureFocusedElement() {
    this._capturedFocusedElement.set(this.focusedElement());
  }

  public focusLastCapturedElement() {
    this._capturedFocusedElement()?.focus();
  }

  private isHtmlElement(eventTarget: EventTarget | null): eventTarget is HTMLElement {
    return eventTarget instanceof HTMLElement;
  }
}
