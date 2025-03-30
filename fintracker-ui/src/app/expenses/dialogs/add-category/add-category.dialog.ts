import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { CategoriesService } from 'src/app/expenses/services';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageModule } from 'primeng/message';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { AutoFocus } from 'primeng/autofocus';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './add-category.dialog.html',
  styleUrl: './add-category.dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    InputTextModule,
    AutoFocus,
    ReactiveFormsModule,
    MessageModule,
    NGX_ERRORS_DECLARATIONS
  ]
})
export class AddCategoryDialog {

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly categoriesService = inject(CategoriesService);
  private readonly ref = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig<AddCategoryDialogData> = inject(DynamicDialogConfig);

  protected readonly loading = signal(false);

  protected form = new FormGroup<CategoryForm>({
    name: this.fb.nonNullable.control(this.config.data?.name ?? '', [ Validators.required, Validators.maxLength(30) ])
  });

  public constructor() {
    this.config.header = 'Add new category';
    effect(() => this.loading() ? this.form.disable() : this.form.enable());
  }

  protected onSubmit(): void {
    markFormAsDirty(this.form);
    if (!this.form.valid) return;

    this.loading.set(true);
    this.categoriesService.saveCategory(this.form.getRawValue()).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error: HttpErrorResponse) => {
        this.handleSaveError(error);
        this.loading.set(false);
        return EMPTY;
      })
    ).subscribe(category => {
      this.loading.set(false);
      this.ref.close(category);
    });
  }

  protected onCancel(): void {
    this.ref.close();
  }

  private handleSaveError(error: HttpErrorResponse): void {
    if (error.status === 409) this.form.controls.name.setErrors({ unique: true });
    else this.form.setErrors({ unknownError: true });
  }
}

export interface AddCategoryDialogData {
  name?: string;
}

export interface CategoryForm {
  name: FormControl<string>;
}
