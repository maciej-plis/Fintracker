import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { EMPTY } from 'rxjs';

describe('BreadcrumbComponent', () => {

  beforeEach(() => MockBuilder(BreadcrumbComponent)
    .mock(ActivatedRoute)
    .provide({
      provide: Router,
      useValue: {
        events: EMPTY
      }
    }));

  it('Should create', () => {
    const fixture = MockRender(BreadcrumbComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
