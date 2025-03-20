import { HttpClient } from '@angular/common/http';
import { SvgAssetComponent } from './svg-asset.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { Renderer2 } from '@angular/core';

describe('SvgAssetComponent', () => {

  beforeEach(() => MockBuilder(SvgAssetComponent)
    .mock(HttpClient)
    .mock(Renderer2));

  it('Should create', () => {
    const fixture = MockRender(SvgAssetComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
