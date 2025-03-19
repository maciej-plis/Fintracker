import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-menu-cell-renderer',
  templateUrl: './menu-cell-renderer.component.html',
  styleUrl: './menu-cell-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    MenuModule
  ]
})
export class MenuCellRenderer implements ICellRendererAngularComp {

  private readonly elRef = inject(ElementRef);

  protected readonly menuItems = signal<MenuItem[]>([]);

  public agInit(params: MenuCellRendererParams): void {
    this.updateState(params);
  }

  public refresh(params: MenuCellRendererParams): boolean {
    this.updateState(params);
    return true;
  }

  public triggerMenuButton(): void {
    this.elRef.nativeElement.querySelector('button')?.click();
  }

  private updateState(params: MenuCellRendererParams): void {
    this.menuItems.set(params.menuItems);
  }
}

export interface MenuCellRendererParams extends ICellRendererParams {
  menuItems: MenuItem[];
}
