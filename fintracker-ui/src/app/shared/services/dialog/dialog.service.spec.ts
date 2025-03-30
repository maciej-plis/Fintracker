import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { MockBuilder, MockRender } from 'ng-mocks';
import { DialogService as NgDialogService } from 'primeng/dynamicdialog';
import { FocusService } from '@shared/services';

describe('DialogService', () => {

  beforeEach(() => MockBuilder(DialogService)
    .mock(NgDialogService)
    .mock(FocusService));

  it('Should be created', () => {
    const service = MockRender(DialogService);
    expect(service.componentInstance).toBeDefined();
  });
});
