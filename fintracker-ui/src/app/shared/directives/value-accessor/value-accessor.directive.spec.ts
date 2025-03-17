import { ValueAccessorDirective } from './value-accessor.directive';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('ValueAccessorDirective', () => {

  beforeEach(() => MockBuilder(ValueAccessorDirective));

  it('Should be created', () => {
    const directive = MockRender('<input appValueAccessor>');
    expect(directive.componentInstance).toBeDefined();
  });
});
