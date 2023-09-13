import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCellRenderer } from './svg-cell-renderer.component';

describe('SvgCellRendererComponent', () => {
  let component: SvgCellRenderer;
  let fixture: ComponentFixture<SvgCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgCellRenderer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SvgCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
