export function startsWithIgnoreCase(value: string, test: string) {
  return value.substring(0, test.length).toLowerCase() === test.toLowerCase();
}
