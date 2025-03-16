import { inject, Injectable, Type } from '@angular/core';
import { DialogService as NgDialogService } from 'primeng/dynamicdialog';
import { filter, Observable, tap } from 'rxjs';
import { FocusService } from '@shared/services/focus/focus.service';
import { hasValue } from '@shared/utils/filters.utils';
import { DynamicDialogConfig } from 'primeng/dynamicdialog/dynamicdialog-config';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private static readonly DEFAULT_DIALOG_CONFIG: DynamicDialogConfig = {
    modal: true,
    dismissableMask: true,
    position: 'top',
    width: '350px',
    transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)'
  };

  private readonly dialogService = inject(NgDialogService);
  private readonly focusService = inject(FocusService);

  public open<T extends any>(componentType: Type<any>, config: DynamicDialogConfig = {}): Observable<T> {
    this.focusService.captureFocusedElement();
    return this.dialogService.open(componentType, {...DialogService.DEFAULT_DIALOG_CONFIG, ...config}).onClose.pipe(
      tap(() => this.focusService.focusLastCapturedElement()),
      filter(hasValue)
    );
  }
}
