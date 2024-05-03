export const nullableFilterOptions = ['blank', 'notBlank'];

export const nonNullableTextFilterOptions = ['contains', 'notContains', 'equals', 'notEqual', 'startsWith', 'endsWith'];
export const nullableTextFilterOptions = [...nonNullableTextFilterOptions, ...nullableFilterOptions];

export const nonNullableDateFilterOptions = ['equals', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual', 'inRange'];
export const nullableDateFilterOptions = [...nonNullableDateFilterOptions, ...nullableFilterOptions];

export const nonNullableNumberFilterOptions = ['equals', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual', 'inRange'];
export const nullableNumberFilterOptions = [...nonNullableNumberFilterOptions, ...nullableFilterOptions];
