import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { TotalItemsStatusPanel } from 'src/app/expenses/components/total-items-status-panel/total-items-status-panel.component';
import { GridApi, IRowNode } from 'ag-grid-community';
import { AgGridCommon } from 'ag-grid-community/dist/types/src/interfaces/iCommon';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import anything = jasmine.anything;

const rowData: IRowNode[] = [
  { data: { getRawValue: () => ({ id: '1', amount: 3, price: 2.5 }) } },
  { data: { getRawValue: () => ({ id: '2', amount: 1, price: 7 }) } },
  { data: { getRawValue: () => ({ id: '3', amount: 10, price: 1 }) } },
  { data: { getRawValue: () => ({ id: '4', amount: 6, price: 0.5 }) } }
] as any;

describe('TotalItemsStatusPanel', () => {

  let apiSpy: SpyObj<GridApi>;
  let paramsSpy: SpyObj<AgGridCommon<any, any>>;

  beforeEach(() => MockBuilder(TotalItemsStatusPanel));

  beforeEach(() => {
    apiSpy = createSpyObj<GridApi>([ 'addEventListener', 'forEachNode' ]);
    paramsSpy = createSpyObj<AgGridCommon<any, any>>({}, { api: apiSpy });
  });

  it('Should create', () => {
    const fixture = MockRender(TotalItemsStatusPanel);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should subscribe to rowDataUpdated events', () => {
    const fixture = MockRender(TotalItemsStatusPanel);
    const component = fixture.point.componentInstance;

    component.agInit(paramsSpy as any);

    expect(apiSpy.addEventListener).toHaveBeenCalledWith('rowDataUpdated', anything());
  });

  it('Should update total items after rowDataUpdated event', () => {
    apiSpy.forEachNode.and.callFake(fn => rowData.forEach((row, i) => fn(row, i)));
    apiSpy.addEventListener.withArgs('rowDataUpdated', anything()).and.callFake((_, listener) => listener(paramsSpy as any));

    const fixture = MockRender(TotalItemsStatusPanel);
    const component = fixture.point.componentInstance;

    component.agInit(paramsSpy as any);
    fixture.detectChanges();

    const el = ngMocks.find('.ag-status-name-value-value');
    expect(el.nativeElement.innerText).toEqual('4');
  });

  it('Should refresh', () => {
    const fixture = MockRender(TotalItemsStatusPanel);
    const component = fixture.point.componentInstance;
    component.agInit(paramsSpy as any);

    const result = component.refresh({} as any);

    expect(result).toBeTrue();
  });
});
