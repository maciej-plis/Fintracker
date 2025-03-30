import { InjectionToken } from '@angular/core';
import { AnyType, ngMocks } from 'ng-mocks';
import SpyObj = jasmine.SpyObj;

export function getSpyObj<T>(provider: InjectionToken<T> | AnyType<T>): SpyObj<T> {
  return ngMocks.get(provider) as SpyObj<T>;
}
