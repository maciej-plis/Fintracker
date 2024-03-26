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

  private nativeElement = inject(ElementRef).nativeElement;

  protected menuItems = signal<MenuItem[]>([]);

  public agInit(params: MenuCellRendererParams): void {
    this.menuItems.set(params.menuItems);
  }

  public refresh(params: MenuCellRendererParams): boolean {
    this.agInit(params);
    return true;
  }

  public triggerMenuButton() {
    this.nativeElement.querySelector('button')?.click();
  }
}

export interface MenuCellRendererParams extends ICellRendererParams {
  menuItems: MenuItem[];
}
