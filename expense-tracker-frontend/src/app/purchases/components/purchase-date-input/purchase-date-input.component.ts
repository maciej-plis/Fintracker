import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-purchase-date-input',
  templateUrl: './purchase-date-input.component.html',
  styleUrls: ['./purchase-date-input.component.scss']
})
export class PurchaseDateInputComponent {

  @Input() dateFormControl: FormControl;

  constructor() { }
}
