import { MockBuilder, MockRender } from 'ng-mocks';
import { ProductsInputTableComponent } from 'src/app/expenses/components/products-table/products-input-table.component';
import { CategoriesService } from 'src/app/expenses/services';
import { ProductsApi } from '@core/api';
import { DialogService } from 'primeng/dynamicdialog';

describe('ProductsInputTableComponent', () => {

  beforeEach(() => MockBuilder(ProductsInputTableComponent)
    .mock(CategoriesService)
    .mock(ProductsApi)
    .mock(DialogService));

  it('Should create', () => {
    const fixture = MockRender(ProductsInputTableComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
