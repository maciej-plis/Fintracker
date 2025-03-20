import { AppComponent } from './app.component';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('AppComponent', () => {

  beforeEach(() => MockBuilder(AppComponent));

  it('Should create the app', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
