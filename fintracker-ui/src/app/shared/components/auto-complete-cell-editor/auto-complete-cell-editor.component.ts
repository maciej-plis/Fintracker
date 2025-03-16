import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { agGridOverlayOptions } from '@shared/constants';
import { AutoFocusModule } from 'primeng/autofocus';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-autocomplete-cell-editor',
  templateUrl: './auto-complete-cell-editor.component.html',
  styleUrls: ['./auto-complete-cell-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoCompleteModule,
    FormsModule,
    AutoFocusModule,
    AsyncPipe
  ]
})
export class AutoCompleteCellEditor implements ICellEditorAngularComp {

  protected readonly agGridOverlayOptions = agGridOverlayOptions;

  protected params: AutoCompleteCellEditorParams;
  protected value: any;

  protected filterSubject = new BehaviorSubject('');
  protected filter$ = this.filterSubject.asObservable();
  protected filteredSuggestions$: Observable<string[]>;

  public agInit(params: AutoCompleteCellEditorParams): void {
    this.params = params;
    this.initializeValueBasedOnEventKey();
    this.initializeSuggestionsFilter();
  }

  public setValue(value: any) {
    this.value = value;
  }

  public getValue(): any {
    return this.value;
  }

  private initializeValueBasedOnEventKey() {
    const {eventKey, value} = this.params;
    if (!eventKey || eventKey == 'Enter') {
      this.value = value;
    } else if (eventKey?.match(/^[a-zA-Z]$/)) {
      this.value = eventKey;
    } else {
      this.value = '';
    }
  }

  private initializeSuggestionsFilter() {
    this.filteredSuggestions$ = this.filter$.pipe(
      switchMap(filter => this.params.suggestionsFunc(filter))
    );
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
