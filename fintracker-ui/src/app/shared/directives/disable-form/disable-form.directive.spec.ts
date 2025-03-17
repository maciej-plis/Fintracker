import { DisableFormDirective } from '@shared/directives/disable-form/disable-form.directive';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

describe('DisableFormDirective', () => {

  beforeEach(() => MockBuilder(DisableFormDirective));

  it('Should be created', () => {
    const fixture = MockRender('<form disableForm="true"></form>');
    expect(fixture.componentInstance).toBeDefined();
  });

  it('Should disable form', () => {
    MockRender('<form disableForm="true"></form>');

    const fieldset = ngMocks.find('fieldset');

    expect(fieldset.properties['disabled']).toEqual('true');
  });

  it('Should enable form input', () => {
    MockRender('<form disableForm="false"></form>');

    const fieldset = ngMocks.find('fieldset');

    expect(fieldset.properties['disabled']).toEqual('false');
  });
});
