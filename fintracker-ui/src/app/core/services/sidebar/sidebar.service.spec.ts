import { SidebarService } from './sidebar.service';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('SidebarService', () => {

  beforeEach(() => MockBuilder(SidebarService));

  it('Should create', () => {
    const service = MockRender(SidebarService);
    expect(service.componentInstance).toBeDefined();
  });
});
