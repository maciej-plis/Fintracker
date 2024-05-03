import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { v4 as randomUUID } from 'uuid';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { ShopDTO } from '@core/api';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shop-form',
  templateUrl: './add-shop.dialog.html',
  styleUrl: './add-shop.dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoFocusModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf
  ]
})
export class AddShopDialog {

  private readonly ref = inject(DynamicDialogRef);

  protected idControl = new FormControl(randomUUID(), {nonNullable: true, validators: [Validators.required]});
  protected nameControl = new FormControl<string>('', {nonNullable: true, validators: [Validators.required]});
  protected shopFormGroup = new FormGroup<ShopForm>({
    id: this.idControl,
    name: this.nameControl
  });

  public save() {
    markFormAsDirty(this.shopFormGroup);
    if (!this.shopFormGroup.valid) return;

    const shop: ShopDTO = this.shopFormGroup.getRawValue();
    this.ref.close(shop);
  }

  public cancel() {
    this.ref.close();
  }
}

export interface ShopForm {
  id: FormControl<string>;
  name: FormControl<string>;
}

