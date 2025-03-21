import { ChangeDetectionStrategy, Component, effect, model, signal } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { agGridOverlayOptions } from '@shared/constants';
import { AutoFocusModule } from 'primeng/autofocus';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-autocomplete-cell-editor',
  templateUrl: './auto-complete-cell-editor.component.html',
  styleUrls: [ './auto-complete-cell-editor.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoCompleteModule,
    FormsModule,
    AutoFocusModule
  ]
})
export class AutoCompleteCellEditor implements ICellEditorAngularComp {

  protected readonly agGridOverlayOptions = agGridOverlayOptions;

  protected params?: AutoCompleteCellEditorParams;
  protected value = model.required<any>();

  protected filter = signal('', { equal: () => false });
  protected filteredSuggestions = signal<any[]>([]);

  constructor() {
    effect(() => {
      const filter = this.filter();
      this.params?.suggestionsFunc(filter).subscribe(result => result && this.filteredSuggestions.set(result));
    }, { allowSignalWrites: true });
  }

  public agInit(params: AutoCompleteCellEditorParams): void {
    this.params = params;
    this.initializeValueBasedOnEventKey(params);
  }

  public setValue(value: any) {
    this.value.set(value);
  }

  public getValue(): any {
    return this.value();
  }

  private initializeValueBasedOnEventKey(params: AutoCompleteCellEditorParams) {
    const { eventKey, value } = params;
    if (!eventKey || eventKey == 'Enter') {
      this.value.set(value);
    } else if (eventKey?.match(/^[a-zA-Z]$/)) {
      this.value.set(eventKey);
    } else {
      this.value.set('');
    }
  }
}

export interface AutoCompleteCellEditorParams extends ICellEditorParams {
  suggestionsFunc: (filter: string) => Observable<any[]>;
  forceSelection?: boolean;
  minLength?: number;
  delay?: number;
  label?: string;
  onSelect?: (event: AutoCompleteSelectEvent, filter: string, valueSetter: (value: any) => void) => void;
}
