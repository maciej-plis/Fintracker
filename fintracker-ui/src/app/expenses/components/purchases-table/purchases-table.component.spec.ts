import { PurchasesTableComponent } from '@expenses/components';

import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { PurchasesTableService } from '@expenses/services';
import { getSpyObj } from '@shared/utils/test.utils';
import createSpy = jasmine.createSpy;

describe('PurchasesTableComponent', () => {

  beforeEach(() => MockBuilder(PurchasesTableComponent)
    .mock(PurchasesTableService, {
      onAddItem: createSpy(),
      onDeleteSelected: createSpy()
    })
  );

  it('Should create', () => {
    const fixture = MockRender(PurchasesTableComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should call service when add button is clicked', () => {
    const purchasesTableServiceSpy = getSpyObj(PurchasesTableService);

    MockRender(PurchasesTableComponent);

    const addBtn = ngMocks.find('p-button[label="Add"]');
    ngMocks.click(addBtn);

    expect(purchasesTableServiceSpy.onAddItem).toHaveBeenCalled();
  });

  it('Should call service when delete selected button is clicked', () => {
    const purchasesTableServiceSpy = getSpyObj(PurchasesTableService);

    MockRender(PurchasesTableComponent);

    const addBtn = ngMocks.find('p-button[label="Delete Selected"]');
    ngMocks.click(addBtn);

    expect(purchasesTableServiceSpy.onDeleteSelected).toHaveBeenCalled();
  });
});
