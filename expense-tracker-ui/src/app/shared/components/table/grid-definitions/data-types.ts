import { currencyValueFormatter } from '@shared/utils';
import { currencyCode, currencyFormat, locale } from 'src/app/app.constants';
import { DataTypeDefinition } from 'ag-grid-community';

export const currency: DataTypeDefinition = {
  extendsDataType: 'number',
  baseDataType: 'number',
  valueFormatter: currencyValueFormatter(currencyFormat, currencyCode, 'narrow', locale)
};
