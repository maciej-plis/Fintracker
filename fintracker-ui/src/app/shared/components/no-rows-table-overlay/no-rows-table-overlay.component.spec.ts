import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRowsTableOverlayComponent } from 'src/app/shared/components/no-rows-table-overlay/no-rows-table-overlay.component';

describe('NoRowsTableOverlayComponent', () => {
  let component: NoRowsTableOverlayComponent;
  let fixture: ComponentFixture<NoRowsTableOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NoRowsTableOverlayComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NoRowsTableOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
