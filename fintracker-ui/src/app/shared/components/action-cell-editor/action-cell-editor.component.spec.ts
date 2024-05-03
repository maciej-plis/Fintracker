import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCellEditor } from './action-cell-editor.component';

describe('ButtonCellEditorComponent', () => {
  let component: ActionCellEditor;
  let fixture: ComponentFixture<ActionCellEditor>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionCellEditor]
    });
    fixture = TestBed.createComponent(ActionCellEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
