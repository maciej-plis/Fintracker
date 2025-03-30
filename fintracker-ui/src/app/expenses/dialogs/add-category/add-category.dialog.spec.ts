import { AddCategoryDialog } from './add-category.dialog';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ErrorDirective, ErrorsDirective, NgxErrorsFormDirective } from '@ngspot/ngx-errors';
import { CategoriesService } from 'src/app/expenses/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of, Subject, throwError } from 'rxjs';
import { CategoryDTO } from '@core/api';
import { AutoFocus } from 'primeng/autofocus';
import { getSpyObj } from '@shared/utils/test.utils';
import createSpy = jasmine.createSpy;

describe('AddCategoryDialog', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(AddCategoryDialog)
    .keep(ReactiveFormsModule)
    .keep(InputTextModule)
    .keep(ButtonModule)
    .keep(AutoFocus)
    .keep(MessageModule)
    .keep(ErrorsDirective)
    .keep(ErrorDirective)
    .keep(NgxErrorsFormDirective)
    .mock(CategoriesService, {
      saveCategory: createSpy()
    })
    .mock(DynamicDialogRef, {
      close: createSpy()
    })
    .mock(DynamicDialogConfig, {
      data: { name: 'Entertainment' }
    })
  );

  it('Should create', () => {
    const fixture = MockRender(AddCategoryDialog);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should set dialog header', () => {
    const setHeaderSpy = MockInstance(DynamicDialogConfig, 'header', createSpy(), 'set');

    MockRender(AddCategoryDialog);

    expect(setHeaderSpy).toHaveBeenCalledWith('Add new category');
  });

  it('Should focus name input', async () => {
    const fixture = MockRender(AddCategoryDialog);
    await fixture.whenStable();

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(document.activeElement).toEqual(categoryNameInput.nativeElement);
  });

  it('Should have empty initial input if no param', () => {
    MockInstance(DynamicDialogConfig, 'data', {});

    MockRender(AddCategoryDialog);

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(categoryNameInput.nativeElement.value).toEqual('');
  });

  it('Should have initial input taken from param', () => {
    MockRender(AddCategoryDialog);

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(categoryNameInput.nativeElement.value).toEqual('Entertainment');
  });

  describe('cancel', () => {
    it('Should close dialog', () => {
      MockRender(AddCategoryDialog);

      ngMocks.click('button[type="button"]');

      expect(getSpyObj(DynamicDialogRef).close).toHaveBeenCalledWith();
    });
  });

  describe('submit', () => {
    it('Should save category and close dialog with saved result', () => {
      getSpyObj(CategoriesService).saveCategory.and.returnValue(of({ id: '1', name: 'Entertainment' }));

      MockRender(AddCategoryDialog);

      ngMocks.trigger('form', 'ngSubmit');

      expect(getSpyObj(CategoriesService).saveCategory).toHaveBeenCalledWith({ name: 'Entertainment' });
      expect(getSpyObj(DynamicDialogRef).close).toHaveBeenCalledWith({ id: '1', name: 'Entertainment' });
    });

    it('Should disable form while submit is in progress', () => {
      const emitter = new Subject<CategoryDTO>();
      getSpyObj(CategoriesService).saveCategory.and.returnValue(emitter.asObservable());

      const fixture = MockRender(AddCategoryDialog);

      ngMocks.trigger('form', 'ngSubmit');
      fixture.detectChanges();

      expect(ngMocks.find('input').nativeElement.disabled).toEqual(true);
      expect(ngMocks.find('button[type="submit"]').nativeElement.disabled).toEqual(true);

      emitter.next({} as CategoryDTO);
      fixture.detectChanges();

      expect(ngMocks.find('input').nativeElement.disabled).toEqual(false);
      expect(ngMocks.find('button[type="submit"]').nativeElement.disabled).toEqual(false);
    });

    it('Should not close dialog when submit fails', () => {
      getSpyObj(CategoriesService).saveCategory.and.returnValue(throwError(() => ({ status: 409 })));

      MockRender(AddCategoryDialog);

      ngMocks.trigger('form', 'ngSubmit');

      expect(getSpyObj(DynamicDialogRef).close).not.toHaveBeenCalled();
    });
  });
});
