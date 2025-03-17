import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('DialogService', () => {

  beforeEach(() => MockBuilder(DialogService));

  it('Should be created', () => {
    const service = MockRender(DialogService);
    expect(service.componentInstance).toBeDefined();
  });
});
