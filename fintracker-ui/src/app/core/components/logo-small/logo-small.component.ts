import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo-small',
  templateUrl: './logo-small.component.svg',
  styleUrls: ['./logo-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoSmallComponent {

}
