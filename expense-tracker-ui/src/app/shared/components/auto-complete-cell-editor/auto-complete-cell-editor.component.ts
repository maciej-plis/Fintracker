import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
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
    AsyncPipe
  ]
})
export class AutoCompleteCellEditor implements ICellEditorAngularComp {

  @ViewChild('autoComplete', {read: ElementRef})
  public autoComplete: ElementRef;

  public params: AutoCompleteCellEditorParams;
  public value: any;

  public filterSubject = new BehaviorSubject('');
  public filter$ = this.filterSubject.asObservable();
  public filteredSuggestions$: Observable<string[]>;

  public afterGuiAttached() {
    this.autoComplete.nativeElement.querySelector('input').focus();
  }

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
  completeOnFocus?: boolean;
  minLength?: number;
  delay?: number;
  label?: string;
  onSelect?: (event: AutoCompleteSelectEvent, valueSetter: (value: any) => void) => void;
}
