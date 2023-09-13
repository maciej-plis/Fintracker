import { TestBed } from '@angular/core/testing';

import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

describe('DiaalogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
