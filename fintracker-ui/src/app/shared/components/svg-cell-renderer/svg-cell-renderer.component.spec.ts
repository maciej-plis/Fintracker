import { MockBuilder, MockRender } from 'ng-mocks';
import { SvgCellRenderer } from '@shared/components';

describe('SvgCellRenderer', () => {

  beforeEach(() => MockBuilder(SvgCellRenderer));

  it('Should create', () => {
    const fixture = MockRender(SvgCellRenderer);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
