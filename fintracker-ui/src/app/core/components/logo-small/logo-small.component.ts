import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-logo-small',
  templateUrl: './logo-small.component.svg',
  styleUrls: ['./logo-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class LogoSmallComponent {

}
