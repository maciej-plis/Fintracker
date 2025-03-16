import { CategoriesService } from './categories.service';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { CategoriesApi, CategoryDTO } from '@core/api';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('CategoriesService', () => {

  const CATEGORIES: CategoryDTO[] = [
    {id: '1', name: 'Food'},
    {id: '2', name: 'Hygiene'}
  ];

  const NEW_CATEGORY: CategoryDTO = {id: '3', name: 'Entertainment'};

  MockInstance.scope();

  beforeEach(() => MockBuilder(CategoriesService)
    .mock(CategoriesApi, {getCategories: () => of(CATEGORIES as any)})
  );

  it('Should create', () => {
    const service = MockRender(CategoriesService).componentInstance;
    expect(service).toBeDefined();
  });

  it('Should load categories on init', () => {
    const getCategoriesSpy = MockInstance(CategoriesApi, 'getCategories', createSpy('getCategoriesSpy'));

    getCategoriesSpy.and.returnValue(of(CATEGORIES as any));

    const service = MockRender(CategoriesService).componentInstance;

    expect(getCategoriesSpy).toHaveBeenCalled();
    expect(service.categories()).toEqual(CATEGORIES);
  });

  it('Should load categories when refresh is called', () => {
    const getCategoriesSpy = MockInstance(CategoriesApi, 'getCategories', createSpy('getCategoriesSpy'));

    getCategoriesSpy.and.returnValue(of(CATEGORIES as any));

    const service = MockRender(CategoriesService).componentInstance;

    service.refreshCategories();

    expect(getCategoriesSpy).toHaveBeenCalled();
    expect(service.categories()).toEqual(CATEGORIES);
  });

  it('Should save new category and return it', () => {
    const addCategorySpy = MockInstance(CategoriesApi, 'addCategory', createSpy('addCategorySpy'));
    addCategorySpy.and.returnValue(of('3' as any));

    const getCategorySpy = MockInstance(CategoriesApi, 'getCategory', createSpy('getCategorySpy'));
    getCategorySpy.and.returnValue(of(NEW_CATEGORY as any));

    const service = MockRender(CategoriesService).componentInstance;

    service.saveCategory({name: 'Entertainment'}).subscribe(category => {
      expect(addCategorySpy).toHaveBeenCalledWith({name: 'Entertainment'});
      expect(getCategorySpy).toHaveBeenCalledWith('3');
      expect(category).toEqual(NEW_CATEGORY);
    });
  });

  it('Should update state with new category after saving', () => {
    const addCategorySpy = MockInstance(CategoriesApi, 'addCategory', createSpy('addCategorySpy'));
    addCategorySpy.and.returnValue(of('3' as any));

    const getCategorySpy = MockInstance(CategoriesApi, 'getCategory', createSpy('getCategorySpy'));
    getCategorySpy.and.returnValue(of(NEW_CATEGORY as any));

    const service = MockRender(CategoriesService).componentInstance;

    service.saveCategory({name: 'Entertainment'}).subscribe();

    expect(service.categories()).toEqual([...CATEGORIES, NEW_CATEGORY]);
  });
})
