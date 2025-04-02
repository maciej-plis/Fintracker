import { ApplyHostClassesDirective } from 'src/app/shared/directives/apply-host-classes/apply-host-classes.directive';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('ApplyHostClassesDirective', () => {

  beforeEach(() => MockBuilder(ApplyHostClassesDirective));

  it('Should be created', () => {
    const directive = MockRender('<input appApplyHostClasses>');
    expect(directive.componentInstance).toBeDefined();
  });
});
