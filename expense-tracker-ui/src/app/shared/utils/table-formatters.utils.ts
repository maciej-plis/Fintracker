import { formatCurrency, formatDate, getCurrencySymbol } from '@angular/common';
import { ValueFormatterLiteFunc } from 'ag-grid-community';

export function dateValueFormatter(format: string, locale: string): ValueFormatterLiteFunc<any, any> {
  return ({value}) => !!value ? formatDate(value, format, locale) : '';
}

export function currencyValueFormatter(format: string, currencyCode: string, currencySymbolFormat: 'wide' | 'narrow', locale: string): ValueFormatterLiteFunc<any, any> {
  const currencySymbol = getCurrencySymbol(currencyCode, currencySymbolFormat);
  return ({value}) => {
    if (value == null) return '';
    else if (isNaN(value)) return 'Invalid Number';
    else return formatCurrency(value, locale, currencySymbol, currencyCode, format);
  };
}
