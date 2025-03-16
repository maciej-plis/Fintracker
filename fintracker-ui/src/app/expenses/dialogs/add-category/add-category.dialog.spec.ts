import { AddCategoryDialog } from './add-category.dialog';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ErrorDirective, ErrorsDirective, NgxErrorsFormDirective } from '@ngspot/ngx-errors';
import { CategoriesService } from 'src/app/expenses/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of, Subject, throwError } from 'rxjs';
import { CategoryDTO } from '@core/api';
import createSpy = jasmine.createSpy;

describe('AddCategoryDialog', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(AddCategoryDialog)
    .keep(AutoFocusModule)
    .keep(ButtonModule)
    .keep(InputTextModule)
    .keep(ReactiveFormsModule)
    .keep(MessageModule)
    .keep(ErrorsDirective)
    .keep(ErrorDirective)
    .keep(NgxErrorsFormDirective)
    .mock(CategoriesService)
    .mock(DynamicDialogRef)
    .mock(DynamicDialogConfig)
  );

  it('Should create', () => {
    const fixture = MockRender(AddCategoryDialog);
    expect(fixture.componentInstance).toBeDefined();
  });

  it('Should set dialog header', () => {
    const setHeaderSpy = MockInstance(DynamicDialogConfig, 'header', createSpy('setHeader'), 'set');

    MockRender(AddCategoryDialog);

    expect(setHeaderSpy).toHaveBeenCalledWith('Add new category');
  });

  it('Should focus name input', async () => {
    const fixture = MockRender(AddCategoryDialog);
    await fixture.whenStable();

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(document.activeElement).toEqual(categoryNameInput.nativeElement);
  });

  it('Should have empty name input if no param', () => {
    MockInstance(DynamicDialogConfig, 'data', {});

    MockRender(AddCategoryDialog);

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(categoryNameInput.nativeElement.value).toEqual('');
  });

  it('Should have name input taken from param', () => {
    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment'});

    MockRender(AddCategoryDialog);

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(categoryNameInput.nativeElement.value).toEqual('Entertainment');
  });

  it('Should close dialog', () => {
    const closeDialogSpy = MockInstance(DynamicDialogRef, 'close', createSpy('closeDialog'));

    MockRender(AddCategoryDialog);

    ngMocks.click('button[type="button"]');

    expect(closeDialogSpy).toHaveBeenCalledWith();
  });

  it('Should save category and close dialog with saved result', () => {
    const closeDialogSpy = MockInstance(DynamicDialogRef, 'close', createSpy('closeDialog'));
    const saveCategorySpy = MockInstance(CategoriesService, 'saveCategory', createSpy('saveCategory'));
    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment '});

    saveCategorySpy.and.returnValue(of({name: 'Entertainment'}));

    MockRender(AddCategoryDialog);

    ngMocks.find('form').triggerEventHandler('ngSubmit');

    expect(saveCategorySpy).toHaveBeenCalledWith({name: 'Entertainment '});
    expect(closeDialogSpy).toHaveBeenCalledWith({name: 'Entertainment'});
  });

  it('Should disable form while submit is processing', () => {
    const saveCategoryResponse = new Subject<CategoryDTO>();

    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment'});
    MockInstance(CategoriesService, 'saveCategory', _ => saveCategoryResponse.asObservable());

    const fixture = MockRender(AddCategoryDialog);

    ngMocks.find('form').triggerEventHandler('ngSubmit');
    fixture.detectChanges();

    expect(ngMocks.input('form', 'disableForm')).toEqual(true);

    saveCategoryResponse.next({} as CategoryDTO);
    fixture.detectChanges();

    expect(ngMocks.input('form', 'disableForm')).toEqual(false);
  });

  it('Should not close dialog when submit fails', () => {
    const closeDialogSpy = MockInstance(DynamicDialogRef, 'close', createSpy('closeDialog'));
    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment'});
    MockInstance(CategoriesService, 'saveCategory', _ => throwError(() => ({})));

    MockRender(AddCategoryDialog);

    ngMocks.find('form').triggerEventHandler('ngSubmit');

    expect(closeDialogSpy).not.toHaveBeenCalled();
  });
});
