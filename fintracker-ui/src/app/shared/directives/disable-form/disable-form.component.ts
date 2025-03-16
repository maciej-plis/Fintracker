import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: '[disableForm]',
  templateUrl: './disable-form.component.html',
  styleUrl: './disable-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class DisableFormDirective {
  public readonly disableForm = input.required<boolean>();
}
