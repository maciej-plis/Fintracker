import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTableOverlayComponent } from './loading-table-overlay.component';

describe('LoadingTableOverlayComponent', () => {
  let component: LoadingTableOverlayComponent;
  let fixture: ComponentFixture<LoadingTableOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoadingTableOverlayComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoadingTableOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
