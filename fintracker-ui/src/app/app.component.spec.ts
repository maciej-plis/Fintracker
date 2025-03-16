import { AppComponent } from './app.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';

describe('AppComponent', () => {

  beforeEach(() => MockBuilder(AppComponent, AppModule));

  it('Should create the app', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
