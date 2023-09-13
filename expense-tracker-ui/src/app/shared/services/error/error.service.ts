import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private readonly messageService = inject(MessageService);

  public handleApiError(message: string): (error: any) => Observable<never> {
    return (error: any) => {
      this.messageService.add({severity: 'error', summary: 'Failure', detail: message});
      console.error('API error:', error);
      return EMPTY;
    };
  }
}
