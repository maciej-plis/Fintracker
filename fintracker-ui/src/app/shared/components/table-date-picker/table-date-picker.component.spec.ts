import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatePickerComponent } from './table-date-picker.component';

describe('TableDatePickerComponent', () => {
  let component: TableDatePickerComponent;
  let fixture: ComponentFixture<TableDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDatePickerComponent]
    });
    fixture = TestBed.createComponent(TableDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
