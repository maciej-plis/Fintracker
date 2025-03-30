import { PurchasesTableService } from './purchases-table.service';

import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { GridApi } from 'ag-grid-community';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PurchasesApi, PurchaseSummariesApi, ShopsApi } from '@core/api';
import { RowNode } from 'ag-grid-enterprise';
import { of, throwError } from 'rxjs';
import { getSpyObj } from '@shared/utils/test.utils';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import objectContaining = jasmine.objectContaining;
import createSpy = jasmine.createSpy;


const selectedRowNodes = [
  { data: { id: '1' } },
  { data: { id: '2' } },
  { data: { id: '4' } }
] as RowNode[];

describe('PurchasesTableService', () => {

  let apiSpy: SpyObj<GridApi>;

  MockInstance.scope();

  beforeEach(() => MockBuilder(PurchasesTableService)
    .mock(PurchaseSummariesApi)
    .mock(ShopsApi)
    .mock(PurchasesApi, {
      removePurchases: createSpy().and.returnValue(of(void 0 as any))
    })
    .mock(ConfirmationService, {
      confirm: createSpy().and.callFake(params => params.accept?.())
    })
    .mock(MessageService, {
      add: createSpy()
    })
    .mock(Router, {
      navigate: createSpy()
    })
  );

  beforeEach(() => {
    apiSpy = createSpyObj<GridApi>([ 'getSelectedNodes', 'applyServerSideTransaction' ]);
    apiSpy.getSelectedNodes.and.returnValue(selectedRowNodes);
  });

  it('Should create', () => {
    const fixture = MockRender(PurchasesTableService);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should set api when grid is ready', () => {
    const fixture = MockRender(PurchasesTableService);
    const service = fixture.point.componentInstance;

    service.gridOptions.onGridReady?.({ api: apiSpy } as any);

    expect(service.api).toEqual(apiSpy);
  });

  describe('onDeleteSelected', () => {

    it('Should not do anything, when nothing is selected', () => {
      apiSpy.getSelectedNodes.and.returnValue([]);

      const fixture = MockRender(PurchasesTableService, { api: apiSpy });
      const service = fixture.point.componentInstance;

      service.onDeleteSelected();

      expect(getSpyObj(ConfirmationService).confirm).not.toHaveBeenCalled();
    });

    it('Should open modal with confirmation', () => {
      const fixture = MockRender(PurchasesTableService, { api: apiSpy });
      const service = fixture.point.componentInstance;

      service.onDeleteSelected();

      expect(getSpyObj(ConfirmationService).confirm).toHaveBeenCalled();
    });

    it('After modal confirmed should remove selected purchases', () => {
      const fixture = MockRender(PurchasesTableService, { api: apiSpy });
      const service = fixture.point.componentInstance;

      service.onDeleteSelected();

      expect(getSpyObj(PurchasesApi).removePurchases).toHaveBeenCalledWith({ ids: [ '1', '2', '4' ] });
      expect(apiSpy.applyServerSideTransaction).toHaveBeenCalledWith({ remove: [ { id: '1' }, { id: '2' }, { id: '4' } ] });
      expect(getSpyObj(MessageService).add).toHaveBeenCalledWith(objectContaining({ severity: 'info' }));
    });

    it('After modal confirmed should add message if removal fails', () => {
      getSpyObj(PurchasesApi).removePurchases.and.returnValue(throwError(() => null));

      const fixture = MockRender(PurchasesTableService, { api: apiSpy });
      const service = fixture.point.componentInstance;

      service.onDeleteSelected();

      expect(getSpyObj(PurchasesApi).removePurchases).toHaveBeenCalledWith({ ids: [ '1', '2', '4' ] });
      expect(apiSpy.applyServerSideTransaction).not.toHaveBeenCalled();
      expect(getSpyObj(MessageService).add).toHaveBeenCalledWith(objectContaining({ severity: 'error' }));
    });

    it('After modal rejected should not remove anything', () => {
      getSpyObj(ConfirmationService).confirm.and.callFake(params => params.reject?.());

      const fixture = MockRender(PurchasesTableService, { api: apiSpy });
      const service = fixture.point.componentInstance;

      service.onDeleteSelected();

      expect(getSpyObj(PurchasesApi).removePurchases).not.toHaveBeenCalled();
    });
  });

  describe('onAddItem', () => {

    it('Should navigate to add purchase view', () => {
      const fixture = MockRender(PurchasesTableService);
      const service = fixture.point.componentInstance;

      service.onAddItem();

      expect(getSpyObj(Router).navigate).toHaveBeenCalledWith([ 'expenses', 'purchases', `add` ]);
    });
  });

  describe('onEditItem', () => {

    it('Should navigate to edit purchase view', () => {
      const fixture = MockRender(PurchasesTableService);
      const service = fixture.point.componentInstance;

      service.onEditItem({ id: '123' } as any);

      expect(getSpyObj(Router).navigate).toHaveBeenCalledWith([ 'expenses', 'purchases', `edit`, '123' ]);
    });
  });
});
