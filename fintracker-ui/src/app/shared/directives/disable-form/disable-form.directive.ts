import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: '[disableForm]',
  template: `
    <fieldset class="contents" [disabled]="disableForm()">
      <ng-content/>
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class DisableFormDirective {
  public readonly disableForm = input.required<boolean>();
}
