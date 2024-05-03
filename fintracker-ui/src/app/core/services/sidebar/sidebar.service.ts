import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public readonly sidebarVisible$ = signal(false);
  public readonly sidebarVisible = this.sidebarVisible$.asReadonly();

  public showSidebar() {
    this.sidebarVisible$.set(true);
  }

  public hideSidebar() {
    this.sidebarVisible$.set(false);
  }
}
