import { BreadcrumbComponent } from '@core/components';

import { MockBuilder, MockRender } from 'ng-mocks';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('BreadcrumbComponent', () => {

  beforeEach(() => MockBuilder(BreadcrumbComponent)
    .mock(ActivatedRoute)
    .mock(Router, { events: of([]) as any })
  );

  it('Should create', () => {
    const fixture = MockRender(BreadcrumbComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
