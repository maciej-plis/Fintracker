import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPriceStatusPanel } from 'src/app/expenses/components/total-price-status-panel/total-price-status-panel.component';

describe('TotalPriceStatusBarComponent', () => {
  let component: TotalPriceStatusPanel;
  let fixture: ComponentFixture<TotalPriceStatusPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPriceStatusPanel]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TotalPriceStatusPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
