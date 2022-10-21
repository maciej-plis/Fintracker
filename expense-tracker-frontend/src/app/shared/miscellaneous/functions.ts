export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function isAnyPropertyNonNull(value: any): boolean {
  return Object.keys(value).some(key => value[key] != null);
}
