import { TableComponent } from './table.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('TableComponent', () => {

  beforeEach(() => MockBuilder(TableComponent));

  it('Should create', () => {
    const fixture = MockRender(TableComponent, {header: 'Table', gridOptions: {}});
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
