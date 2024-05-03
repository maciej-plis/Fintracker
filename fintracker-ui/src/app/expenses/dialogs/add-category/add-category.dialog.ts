import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { v4 as randomUUID } from 'uuid';
import { CategoryDTO } from '@core/api';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-category-form',
  templateUrl: './add-category.dialog.html',
  styleUrl: './add-category.dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoFocusModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf
  ]
})
export class AddCategoryDialog {

  private readonly ref = inject(DynamicDialogRef);

  protected idControl = new FormControl(randomUUID(), {nonNullable: true, validators: [Validators.required]});
  protected nameControl = new FormControl<string>('', {nonNullable: true, validators: [Validators.required]});
  protected categoryFormGroup = new FormGroup<CategoryForm>({
    id: this.idControl,
    name: this.nameControl
  });

  public save() {
    markFormAsDirty(this.categoryFormGroup);
    if (!this.categoryFormGroup.valid) return;

    const category: CategoryDTO = this.categoryFormGroup.getRawValue();
    this.ref.close(category);
  }

  public cancel() {
    this.ref.close();
  }
}

export interface CategoryForm {
  id: FormControl<string>;
  name: FormControl<string>;
}
