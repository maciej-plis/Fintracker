import { ErrorService } from 'src/app/shared/services/error/error.service';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MessageService } from 'primeng/api';

describe('ErrorService', () => {

  beforeEach(() => MockBuilder(ErrorService)
    .mock(MessageService));

  it('Should be created', () => {
    const service = MockRender(ErrorService);
    expect(service.componentInstance).toBeDefined();
  });
});
