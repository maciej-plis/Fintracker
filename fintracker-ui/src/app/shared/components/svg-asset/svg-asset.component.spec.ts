import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAssetComponent } from './svg-asset.component';

describe('SvgAssetComponent', () => {
  let component: SvgAssetComponent;
  let fixture: ComponentFixture<SvgAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgAssetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SvgAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
