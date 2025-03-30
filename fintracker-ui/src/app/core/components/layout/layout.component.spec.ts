import { LayoutComponent } from './layout.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LayoutService } from '@core/services';
import { Renderer2 } from '@angular/core';

describe('LayoutComponent', () => {

  beforeEach(() => MockBuilder(LayoutComponent)
    .keep(CommonModule)
    .keep(Renderer2)
    .keep(LayoutService)
    .provide({ provide: Router, useValue: { events: of() } }));

  it('Should create', () => {
    const fixture = MockRender(LayoutComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
