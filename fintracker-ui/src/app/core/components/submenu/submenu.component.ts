import { AfterViewChecked, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { LayoutService } from '@core/services/layout/layout.service';
import { DomHandler } from 'primeng/dom';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum ChildrenAnimationState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

@Component({
  selector: '[app-submenu]',
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.layout-root-menuitem]': 'isRoot()',
    '[class.active-menuitem]': 'isActive()'
  },
  animations: [
    trigger('children', [
      state(
        ChildrenAnimationState.COLLAPSED,
        style({
          height: '0'
        })
      ),
      state(
        ChildrenAnimationState.EXPANDED,
        style({
          height: '*'
        })
      ),
      state(
        ChildrenAnimationState.HIDDEN,
        style({
          display: 'none'
        })
      ),
      state(
        ChildrenAnimationState.VISIBLE,
        style({
          display: 'block'
        })
      ),
      transition(`${ ChildrenAnimationState.COLLAPSED } <=> ${ ChildrenAnimationState.EXPANDED }`, animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    Tooltip
  ]
})
export class SubmenuComponent implements AfterViewChecked {

  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly navigationEnd$ = injectNavigationEnd();

  private readonly submenu = viewChild<ElementRef>('submenu');

  public readonly item = input.required<MenuItem>();
  public readonly index = input.required<number>();
  public readonly isRoot = input<boolean>(false);
  public readonly parentKey = input<string | null>(null);

  protected readonly isActive = signal<boolean>(false);
  protected readonly key = computed<string>(() => {
    const parentKey = this.parentKey();
    return parentKey ? parentKey + '-' + this.index() : this.index().toString();
  });

  protected readonly isSlim = this.layoutService.isSlim;
  protected readonly isSlimOrSlimPlusOrHorizontal = this.layoutService.isSlimOrSlimPlusOrHorizontal;

  protected readonly isDesktop = this.layoutService.isDesktop();
  protected readonly isMobile = this.layoutService.isMobile();
  protected readonly isMenuHoverActive = computed(() => this.layoutService.layoutState().menuHoverActive);

  protected readonly defaultRouterLinkActiveOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored'
  };

  get submenuAnimation(): ChildrenAnimationState {
    if (this.layoutService.isDesktop() && this.isSlimOrSlimPlusOrHorizontal()) {
      return this.isActive() ? ChildrenAnimationState.VISIBLE : ChildrenAnimationState.HIDDEN;
    } else if (this.isRoot() || this.isActive()) {
      return ChildrenAnimationState.EXPANDED;
    } else {
      return ChildrenAnimationState.COLLAPSED;
    }
  }

  constructor() {
    this.layoutService.menuSource$
      .pipe(takeUntilDestroyed())
      .subscribe(({ routeEvent, key }) => {
        Promise.resolve(null).then(() => {
          const startsWithKey = key.startsWith(this.key());
          if (routeEvent) {
            this.isActive.set(startsWithKey);
          } else if (!startsWithKey) {
            this.isActive.set(false);
          }
        });
      });

    this.layoutService.resetSource$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.isActive.set(false));

    this.navigationEnd$.subscribe(() => {
      if (this.isSlimOrSlimPlusOrHorizontal()) {
        this.isActive.set(false);
      } else if (this.item().routerLink) {
        this.updateActiveStateFromRoute();
      }
    });
  }

  ngAfterViewChecked() {
    if (this.isRoot() && this.isActive() && this.isDesktop && this.isSlimOrSlimPlusOrHorizontal()) {
      this.calculatePosition(this.submenu()?.nativeElement);
    }
  }

  protected onSubmenuAnimated(event: AnimationEvent) {
    if (event.toState === ChildrenAnimationState.VISIBLE && this.isDesktop && this.isSlimOrSlimPlusOrHorizontal()) {
      this.calculatePosition(event.element);
    }
  }

  protected itemClick(event: Event) {
    const item = this.item();

    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    // toggle menu hover
    if (this.isRoot() && this.isSlimOrSlimPlusOrHorizontal()) {
      this.layoutService.layoutState.update(val => ({ ...val, menuHoverActive: !val.menuHoverActive }));
    }

    // execute additional item command
    item.command && item.command({ originalEvent: event, item });

    // toggle active state
    if (item.items) {
      this.isActive.update(active => !active);
      if (this.isRoot() && this.isActive() && this.isSlimOrSlimPlusOrHorizontal()) {
        this.layoutService.onOverlaySubmenuOpen();
      }
    } else {

      if (this.isMobile) {
        this.layoutService.layoutState.update(val => ({ ...val, staticMenuMobileActive: false }));
      }

      if (this.isSlimOrSlimPlusOrHorizontal()) {
        this.layoutService.reset();
        this.layoutService.layoutState.update(val => ({ ...val, menuHoverActive: false }));
      }
    }

    this.layoutService.onMenuStateChange({ key: this.key() });
  }

  protected onMouseEnter() {
    if (this.isRoot() && this.isSlimOrSlimPlusOrHorizontal() && this.isDesktop && this.isMenuHoverActive()) {
      this.isActive.set(true);
      this.layoutService.onMenuStateChange({ key: this.key() });
    }
  }

  private updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(this.item().routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored'
    });

    if (activeRoute) {
      this.layoutService.onMenuStateChange({
        key: this.key(),
        routeEvent: true
      });
    }
  }

  private calculatePosition(overlay: HTMLElement) {
    if (!overlay.parentElement) return;
    const { left, top } = overlay.parentElement.getBoundingClientRect();
    const [ vWidth, vHeight ] = [ window.innerWidth, window.innerHeight ];
    const [ oWidth, oHeight ] = [ overlay.offsetWidth, overlay.offsetHeight ];
    const scrollbarWidth = DomHandler.calculateScrollbarWidth();

    overlay.style.top = '';
    overlay.style.left = '';

    if (this.layoutService.isHorizontal()) {
      const width = left + oWidth + scrollbarWidth;
      overlay.style.left = vWidth < width ? `${ left - (width - vWidth) }px` : `${ left }px`;
    } else if (this.layoutService.isSlim() || this.layoutService.isSlimPlus()) {
      const height = top + oHeight;
      overlay.style.top = vHeight < height ? `${ top - (height - vHeight) }px` : `${ top }px`;
    }
  }
}
