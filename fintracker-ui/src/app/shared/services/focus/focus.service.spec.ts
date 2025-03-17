import { FocusService } from 'src/app/shared/services/focus/focus.service';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('FocusService', () => {

  beforeEach(() => MockBuilder(FocusService));

  it('Should be created', () => {
    const service = MockRender(FocusService);
    expect(service.componentInstance).toBeDefined();
  });
});
