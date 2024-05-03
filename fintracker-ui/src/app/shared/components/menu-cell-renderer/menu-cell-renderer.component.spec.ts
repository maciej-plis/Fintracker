import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCellRenderer } from './menu-cell-renderer.component';

describe('MenuCellRendererComponent', () => {
  let component: MenuCellRenderer;
  let fixture: ComponentFixture<MenuCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCellRenderer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
