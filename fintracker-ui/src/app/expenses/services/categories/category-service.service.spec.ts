import { CategoriesService } from './categories.service';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { CategoriesApi, CategoryDTO } from '@core/api';
import { of } from 'rxjs';
import { getSpyObj } from '@shared/utils/test.utils';
import createSpy = jasmine.createSpy;

const categories: CategoryDTO[] = [
  { id: '1', name: 'Food' },
  { id: '2', name: 'Hygiene' }
];

const newCategory: CategoryDTO = { id: '3', name: 'Entertainment' };

describe('CategoriesService', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(CategoriesService)
    .mock(CategoriesApi, {
      getCategories: createSpy().and.returnValue(of(categories as any)),
      getCategory: createSpy(),
      addCategory: createSpy()
    })
  );

  it('Should create', () => {
    const fixture = MockRender(CategoriesService);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should load categories on init', () => {
    const fixture = MockRender(CategoriesService);
    const service = fixture.point.componentInstance;

    expect(getSpyObj(CategoriesApi).getCategories).toHaveBeenCalled();
    expect(service.categories()).toEqual(categories);
  });

  describe('refreshCategories', () => {
    it('Should load categories when refresh is called', () => {
      const fixture = MockRender(CategoriesService);
      const service = fixture.point.componentInstance;

      service.refreshCategories();

      expect(getSpyObj(CategoriesApi).getCategories).toHaveBeenCalled();
      expect(service.categories()).toEqual(categories);
    });
  });

  describe('saveCategory', () => {
    beforeEach(() => {
      getSpyObj(CategoriesApi).addCategory.and.returnValue(of('3' as any));
      getSpyObj(CategoriesApi).getCategory.and.returnValue(of(newCategory as any));
    });

    it('Should save new category and return it', () => {
      const fixture = MockRender(CategoriesService);
      const service = fixture.point.componentInstance;

      service.saveCategory({ name: 'Entertainment' }).subscribe(category => {
        expect(getSpyObj(CategoriesApi).addCategory).toHaveBeenCalledWith({ name: 'Entertainment' });
        expect(getSpyObj(CategoriesApi).getCategory).toHaveBeenCalledWith('3');
        expect(category).toEqual(newCategory);
      });
    });

    it('Should update state with new category after saving', () => {
      const fixture = MockRender(CategoriesService);
      const service = fixture.point.componentInstance;

      service.saveCategory({ name: 'Entertainment' }).subscribe(() => {
        expect(service.categories()).toEqual([ ...categories, newCategory ]);
      });
    });
  });
});
