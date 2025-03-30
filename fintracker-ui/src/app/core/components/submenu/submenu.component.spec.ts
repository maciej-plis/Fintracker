import { SubmenuComponent } from './submenu.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LayoutService } from '@core/services';
import { CommonModule } from '@angular/common';

describe('SubmenuComponent', () => {

  beforeEach(() => MockBuilder(SubmenuComponent)
    .keep(CommonModule)
    .keep(LayoutService)
    .mock(ActivatedRoute)
    .mock(Router, { events: of([]) as any })
  );

  it('Should create', () => {
    const fixture = MockRender('<nav app-submenu [item]="item" [index]="index"></nav>', {
      item: {},
      index: 0
    });
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
