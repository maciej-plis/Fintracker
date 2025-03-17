import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private readonly _sidebarVisible = signal(false);
  public readonly sidebarVisible = this._sidebarVisible.asReadonly();

  public showSidebar() {
    this._sidebarVisible.set(true);
  }

  public hideSidebar() {
    this._sidebarVisible.set(false);
  }
}
