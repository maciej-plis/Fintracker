import { ErrorService } from 'src/app/shared/services/error/error.service';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('ErrorService', () => {

  beforeEach(() => MockBuilder(ErrorService));

  it('Should be created', () => {
    const service = MockRender(ErrorService);
    expect(service.componentInstance).toBeDefined();
  });
});
