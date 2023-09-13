export function hasValue<T>(value: T): value is NonNullable<T> {
  return !!value;
}

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function isNotBlank(value?: String): boolean {
  return value != null && value.trim().length > 0;
}

export function isAnyPropertyNonNull(value: any): boolean {
  return Object.keys(value).some(key => value[key] != null);
}
