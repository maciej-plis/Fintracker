import { TablePersistenceService } from './table-persistence.service';

import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';

describe('TablePersistenceService', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(TablePersistenceService));

  it('Should create', () => {
    const fixture = MockRender(TablePersistenceService);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
