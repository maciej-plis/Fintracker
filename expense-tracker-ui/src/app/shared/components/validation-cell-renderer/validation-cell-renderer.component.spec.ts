import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCellRenderer } from './validation-cell-renderer.component';

describe('ValidationCellRendererComponent', () => {
  let component: ValidationCellRenderer;
  let fixture: ComponentFixture<ValidationCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationCellRenderer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ValidationCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
