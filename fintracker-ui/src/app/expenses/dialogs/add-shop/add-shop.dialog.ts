import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { MessageModule } from 'primeng/message';
import { ShopsService } from 'src/app/expenses/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shop-dialog',
  templateUrl: './add-shop.dialog.html',
  styleUrl: './add-shop.dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoFocusModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    NGX_ERRORS_DECLARATIONS
  ]
})
export class AddShopDialog {

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly shopsService = inject(ShopsService);
  private readonly ref = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig<AddShopDialogData> = inject(DynamicDialogConfig);

  protected readonly loading = signal(false);

  protected form = new FormGroup<ShopForm>({
    name: this.fb.nonNullable.control(this.config.data?.name ?? '', [Validators.required, Validators.maxLength(30)])
  });

  public constructor() {
    this.config.header = 'Add new shop';
    effect(() => this.loading() ? this.form.disable() : this.form.enable());
  }

  protected onSubmit(): void {
    markFormAsDirty(this.form);
    if (!this.form.valid) return;

    this.loading.set(true);
    this.shopsService.saveShop(this.form.getRawValue()).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error: HttpErrorResponse) => {
        this.handleSaveError(error);
        this.loading.set(false);
        return EMPTY;
      })
    ).subscribe(shop => {
      this.loading.set(false);
      this.ref.close(shop);
    });
  }

  protected onCancel(): void {
    this.ref.close();
  }

  private handleSaveError(error: HttpErrorResponse): void {
    if (error.status === 409) this.form.controls.name.setErrors({unique: true});
    else this.form.setErrors({unknownError: true});
  }
}

export interface AddShopDialogData {
  name?: string;
}

export interface ShopForm {
  name: FormControl<string>;
}

