import { DateFilterModel, IServerSideDatasource, IServerSideGetRowsParams, IServerSideGetRowsRequest, NumberFilterModel, SetFilterModel, TextFilterModel } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { emit } from '@rsql/emitter';
import { ExpressionNode } from '@rsql/ast';
import { RsqlBuilder } from '@shared/utils/rsql.utils';
import { isNonNull } from '@shared/utils/filters.utils';

export class ServerSideDatasource<T> implements IServerSideDatasource {

  private pageRequestCallback: PageRequestFunction<T>;

  constructor(apiCallFunction: PageRequestFunction<T>) {
    this.pageRequestCallback = apiCallFunction;
  }

  public getRows(params: IServerSideGetRowsParams): void {
    const requestParams = this.getPageRequestParams(params.request);
    this.pageRequestCallback(...requestParams).subscribe({
      next: ({ content, totalItems }) => params.success({ rowData: content, rowCount: totalItems }),
      error: () => params.fail()
    });
  }

  private getPageRequestParams(request: IServerSideGetRowsRequest): PageRequestParams {
    const { startRow = 0, endRow = 0 } = request;
    const pageSize = Math.max(endRow - startRow, 0);
    const page = pageSize > 0 ? startRow / pageSize : 0;
    const sort = request.sortModel.map(({ colId, sort }) => `${ colId },${ sort }`).join(';');
    const filter = this.convertFiltersToRsqlString(request.filterModel as any);
    return [ page, pageSize, sort, filter ];
  }

  private convertFiltersToRsqlString(filters: { [field: string]: FilterModel }): string {
    const expressions = this.convertFiltersToRsqlExpressions(filters);
    return expressions.length ? emit(RsqlBuilder.and(...expressions)) : '';
  }

  private convertFiltersToRsqlExpressions(filters: { [field: string]: FilterModel }): ExpressionNode[] {
    return Object.entries(filters)
      .map(([ field, filter ]) => this.convertFilterToRsqlExpression(field, filter))
      .filter(isNonNull);
  }

  private convertFilterToRsqlExpression(field: string, filterModel: FilterModel): ExpressionNode | null {
    if (isTextFilter(filterModel)) return this.convertTextOrNumberFilterToRsqlExpression(field, filterModel);
    if (isNumberFilter(filterModel)) return this.convertTextOrNumberFilterToRsqlExpression(field, filterModel);
    if (isDateFilter(filterModel)) return this.convertDateFilterToRsqlExpression(field, filterModel);
    if (isSetFilter(filterModel)) return this.convertSetFilterToRsqlExpression(field, filterModel);
    return null;
  }

  private convertTextOrNumberFilterToRsqlExpression(field: string, filterModel: TextFilterModel | NumberFilterModel): ExpressionNode | null {
    const isTextFilter = filterModel.filterType === 'text';
    switch (filterModel.type) {
      case 'blank':
        return RsqlBuilder.blank(field);
      case 'notBlank':
        return RsqlBuilder.notBlank(field);
      case 'equals':
        return RsqlBuilder.equals(field, filterModel.filter!, isTextFilter);
      case 'notEqual':
        return RsqlBuilder.notEquals(field, filterModel.filter!, isTextFilter);
      case 'contains':
        return RsqlBuilder.contains(field, filterModel.filter!, isTextFilter);
      case 'notContains':
        return RsqlBuilder.notContains(field, filterModel.filter!, isTextFilter);
      case 'lessThan':
        return RsqlBuilder.lessThan(field, filterModel.filter!);
      case 'lessThanOrEqual':
        return RsqlBuilder.lessThanOrEqual(field, filterModel.filter!);
      case 'greaterThan':
        return RsqlBuilder.greaterThan(field, filterModel.filter!);
      case 'greaterThanOrEqual':
        return RsqlBuilder.greaterThanOrEqual(field, filterModel.filter!);
      case 'startsWith':
        return RsqlBuilder.startsWith(field, filterModel.filter!, isTextFilter);
      case 'endsWith':
        return RsqlBuilder.endsWith(field, filterModel.filter!, isTextFilter);
      case 'inRange':
        return RsqlBuilder.inRange(field, [ filterModel.filter!, filterModel.filterTo! ]);
      default:
        return null;
    }
  }

  private convertDateFilterToRsqlExpression(field: string, filterModel: DateFilterModel): ExpressionNode | null {
    const dateFrom = filterModel.dateFrom?.split(' ')[0];
    const dateTo = filterModel.dateTo?.split(' ')[0];
    switch (filterModel.type) {
      case 'blank':
        return RsqlBuilder.blank(field);
      case 'notBlank':
        return RsqlBuilder.notBlank(field);
      case 'equals':
        return RsqlBuilder.equals(field, dateFrom!);
      case 'notEqual':
        return RsqlBuilder.notEquals(field, dateFrom!);
      case 'lessThan':
        return RsqlBuilder.lessThan(field, dateFrom!);
      case 'lessThanOrEqual':
        return RsqlBuilder.lessThanOrEqual(field, dateFrom!);
      case 'greaterThan':
        return RsqlBuilder.greaterThan(field, dateFrom!);
      case 'greaterThanOrEqual':
        return RsqlBuilder.greaterThanOrEqual(field, dateFrom!);
      case 'inRange':
        return RsqlBuilder.inRange(field, [ dateFrom!, dateTo! ]);
      default:
        return null;
    }
  }

  private convertSetFilterToRsqlExpression(field: string, filterModel: SetFilterModel): ExpressionNode | null {
    return RsqlBuilder.in(field, filterModel.values);
  }
}

export type FilterModel = TextFilterModel | NumberFilterModel | DateFilterModel | SetFilterModel;

export const isTextFilter = (filter: FilterModel): filter is TextFilterModel => filter.filterType === 'text';
export const isNumberFilter = (filter: FilterModel): filter is NumberFilterModel => filter.filterType === 'number';
export const isDateFilter = (filter: FilterModel): filter is DateFilterModel => filter.filterType === 'date';
export const isSetFilter = (filter: FilterModel): filter is SetFilterModel => filter.filterType === 'set';

export type Page<T> = {
  content: T[];
  totalItems: number;
  totalPages: number;
}

export type PageRequestParams = [ page: number, pageSize: number, sort: string, filter: string ];

export type PageRequestFunction<T> = (...params: PageRequestParams) => Observable<Page<T>>;
