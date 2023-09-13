import { inject, Injectable } from '@angular/core';
import { CategoriesApi, CategoryDTO } from '@core/api';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { AddCategoryDialog } from 'src/app/expenses/dialogs';
import { ErrorService } from '@shared/services/error/error.service';
import { DialogService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly categoriesApi = inject(CategoriesApi);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly errorService = inject(ErrorService);

  private readonly categoriesSubject = new BehaviorSubject([] as CategoryDTO[]);
  public readonly categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.refreshCategories();
  }

  public refreshCategories() {
    this.categoriesApi.getCategories().subscribe(categories =>
      this.categoriesSubject.next(categories)
    );
  }

  public addCategory(): Observable<CategoryDTO | never> {
    return this.openAddCategoryDialog().pipe(
      switchMap(category => this.categoriesApi.addCategory(category)),
      tap(category => {
        this.categoriesSubject.next([...this.categoriesSubject.value, category]);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Category added successfully'});
      }),
      catchError(this.errorService.handleApiError('Failed to add new category'))
    );
  }

  private openAddCategoryDialog(): Observable<CategoryDTO> {
    return this.dialogService.open(AddCategoryDialog, {
      header: 'Add new category'
    });
  }
}
