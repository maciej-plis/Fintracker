import { Component, inject, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfiguratorComponent } from '@core/components/configurator/configurator.component';
import { SidebarComponent, TopbarComponent } from '@core/components';
import { LayoutService } from '@core/services/layout/layout.service';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrl: 'layout.component.scss',
  imports: [
    CommonModule,
    SidebarComponent,
    RouterModule,
    ConfiguratorComponent,
    SidebarComponent,
    TopbarComponent
  ]
})
export class LayoutComponent implements OnDestroy {

  private readonly menuRegionClasses = [ '.layout-sidebar', '.topbar-menubutton' ];

  private readonly layoutService = inject(LayoutService);
  private readonly renderer = inject(Renderer2);
  private readonly navigationEnd$ = injectNavigationEnd();

  private menuOutsideClickListener: (() => void) | null = null;
  private menuScrollListener: (() => void) | null = null;

  protected get containerClass() {
    const layoutConfig = this.layoutService.layoutConfig();
    const layoutState = this.layoutService.layoutState();

    return {
      'layout-light': !layoutConfig.darkTheme,
      'layout-dark': layoutConfig.darkTheme,
      'layout-colorscheme-menu': layoutConfig.menuTheme === 'colorScheme',
      'layout-primarycolor-menu': layoutConfig.menuTheme === 'primaryColor',
      'layout-transparent-menu': layoutConfig.menuTheme === 'transparent',
      'layout-overlay': layoutConfig.menuMode === 'overlay',
      'layout-static': layoutConfig.menuMode === 'static',
      'layout-slim': layoutConfig.menuMode === 'slim',
      'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
      'layout-horizontal': layoutConfig.menuMode === 'horizontal',
      'layout-reveal': layoutConfig.menuMode === 'reveal',
      'layout-drawer': layoutConfig.menuMode === 'drawer',
      'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
      'layout-overlay-active': layoutState.overlayMenuActive,
      'layout-mobile-active': layoutState.staticMenuMobileActive,
      'layout-sidebar-active': layoutState.sidebarActive,
      'layout-sidebar-anchored': layoutState.anchored
    };
  }

  constructor() {
    this.navigationEnd$.subscribe(() => this.hideMenu());
    this.layoutService.overlayOpen$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(document, 'click', (event) =>
            this.isOutsideClicked(event) && this.hideMenu()
          );
        }

        if (this.layoutService.isSlimOrSlimPlusOrHorizontal() && !this.menuScrollListener) {
          const menuContainer = document.querySelector('.layout-menu-container');
          this.menuScrollListener = this.renderer.listen(menuContainer, 'scroll', () =>
            this.layoutService.isDesktop() && this.hideMenu()
          );
        }

        this.layoutService.layoutState().staticMenuMobileActive && this.blockBodyScroll();
      });
  }

  public ngOnDestroy() {
    this.menuOutsideClickListener?.();
    this.menuScrollListener?.();
  }

  private isOutsideClicked(event: any) {
    return this.menuRegionClasses
      .map(c => document.querySelector(c))
      .every(e => !e?.isSameNode(event.target) && !e?.contains(event.target));
  }

  private hideMenu() {
    this.layoutService.layoutState.update(state => ({
      ...state,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false
    }));

    this.layoutService.reset();
    this.clearListeners();
    this.unblockBodyScroll();
  }

  private blockBodyScroll(): void {
    document.body.classList.add('blocked-scroll');
  }

  private unblockBodyScroll(): void {
    document.body.classList.remove('blocked-scroll');
  }

  private clearListeners(): void {
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }

    if (this.menuScrollListener) {
      this.menuScrollListener();
      this.menuScrollListener = null;
    }
  }
}
