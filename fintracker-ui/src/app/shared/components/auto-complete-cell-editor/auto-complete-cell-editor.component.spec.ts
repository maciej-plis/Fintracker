import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteCellEditor } from './auto-complete-cell-editor.component';

describe('AutocompleteCellEditorComponent', () => {
  let component: AutoCompleteCellEditor;
  let fixture: ComponentFixture<AutoCompleteCellEditor>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteCellEditor]
    });
    fixture = TestBed.createComponent(AutoCompleteCellEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
