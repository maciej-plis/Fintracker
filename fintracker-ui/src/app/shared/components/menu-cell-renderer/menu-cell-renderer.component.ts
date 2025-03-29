import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
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

  private readonly button = viewChild.required(Button, { read: ElementRef });

  protected readonly menuItems = signal<MenuItem[]>([]);

  public agInit(params: MenuCellRendererParams): void {
    this.updateState(params);
  }

  public refresh(params: MenuCellRendererParams): boolean {
    this.updateState(params);
    return true;
  }

  protected onMenuClose(): void {
    this.button().nativeElement.querySelector('button').focus();
  }

  public triggerMenu(): void {
    this.button().nativeElement.querySelector('button')?.click();
  }

  private updateState(params: MenuCellRendererParams): void {
    this.menuItems.set(params.menuItems);
  }
}

export interface MenuCellRendererParams extends ICellRendererParams {
  menuItems: MenuItem[];
}
