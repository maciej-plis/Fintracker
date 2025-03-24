import { LayoutComponent } from './layout.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LayoutComponent', () => {

  beforeEach(() => MockBuilder(LayoutComponent)
    .provide({ provide: Router, useValue: { events: of() } }));

  it('Should create', () => {
    const fixture = MockRender(LayoutComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
