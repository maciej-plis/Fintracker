import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function flattenFormControls(form: AbstractControl): AbstractControl[] {
  let extracted: AbstractControl[] = [form];
  if (form instanceof FormArray || form instanceof FormGroup) {
    const children = Object.values(form.controls).map(flattenFormControls);
    extracted = extracted.concat(...children);
  }
  return extracted;
}

export function markFormAsDirty(form: AbstractControl) {
  flattenFormControls(form).forEach(control => control.markAsDirty({onlySelf: true}));
}
