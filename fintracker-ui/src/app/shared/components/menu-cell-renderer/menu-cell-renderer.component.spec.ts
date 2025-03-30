import { MockBuilder, MockRender } from 'ng-mocks';
import { MenuCellRenderer } from '@shared/components/menu-cell-renderer/menu-cell-renderer.component';

describe('MenuCellRenderer', () => {

  beforeEach(() => MockBuilder(MenuCellRenderer));

  it('Should create', () => {
    const fixture = MockRender(MenuCellRenderer);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});

