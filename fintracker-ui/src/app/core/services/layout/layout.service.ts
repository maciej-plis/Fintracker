import { computed, effect, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export type Presets = 'Aura' | 'Lara' | 'Nora';
export type PrimaryColor = 'emerald' | 'green' | 'lime' | 'orange' | 'amber' | 'yellow' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';
export type SurfaceColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'soho' | 'viva' | 'ocean';
export type MenuMode = 'static' | 'overlay' | 'slim' | 'slim-plus' | 'reveal' | 'drawer' | 'horizontal';
export type MenuTheme = 'colorScheme' | 'primaryColor' | 'transparent';

export interface layoutConfig {
  preset: Presets;
  primary: PrimaryColor;
  surface: SurfaceColor;
  darkTheme: boolean;
  menuMode: MenuMode;
  menuTheme: MenuTheme;
}

export interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  profileSidebarVisible: boolean;
  sidebarActive: boolean;
  anchored: boolean;
  overlaySubmenuActive: boolean;
}

export interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private readonly initialConfig: layoutConfig = {
    preset: 'Aura',
    primary: 'indigo',
    surface: 'gray',
    darkTheme: true,
    menuMode: 'drawer',
    menuTheme: 'colorScheme'
  };

  private readonly initialState: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    sidebarActive: false,
    anchored: false,
    overlaySubmenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  public readonly layoutConfig = signal<layoutConfig>(this.initialConfig);
  public readonly layoutState = signal<LayoutState>(this.initialState);

  private overlayOpen = new Subject<void>();
  public overlayOpen$ = this.overlayOpen.asObservable();

  private menuSource = new Subject<MenuChangeEvent>();
  public menuSource$ = this.menuSource.asObservable();

  private resetSource = new Subject<void>();
  public resetSource$ = this.resetSource.asObservable();

  public isSlim = computed(() => this.layoutConfig().menuMode === 'slim');
  public isSlimPlus = computed(() => this.layoutConfig().menuMode === 'slim-plus');
  public isHorizontal = computed(() => this.layoutConfig().menuMode === 'horizontal');
  public isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');
  public isSlimOrSlimPlusOrHorizontal = computed(() => this.isSlim() || this.isSlimPlus() || this.isHorizontal());

  constructor() {
    effect(() => this.handleDarkModeTransition(this.layoutConfig()));
    effect(() => this.isSlimOrSlimPlusOrHorizontal() && this.reset());
  }

  private handleDarkModeTransition(config: layoutConfig): void {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => this.toggleDarkMode(config));
    } else {
      this.toggleDarkMode(config);
    }
  }

  public toggleDarkMode(config: layoutConfig): void {
    if (config.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  public onMenuToggle() {
    if (this.isOverlay()) {
      this.layoutState.update(state => ({ ...state, overlayMenuActive: !state.overlayMenuActive }));
      this.layoutState().overlayMenuActive && this.overlayOpen.next();
    }

    if (this.isDesktop()) {
      this.layoutState.update(state => ({ ...state, staticMenuDesktopInactive: !state.staticMenuDesktopInactive }));
    } else {
      this.layoutState.update(state => ({ ...state, staticMenuMobileActive: !state.staticMenuMobileActive }));
      this.layoutState().staticMenuMobileActive && this.overlayOpen.next();
    }
  }

  public onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  public reset() {
    this.resetSource.next();
  }

  public onOverlaySubmenuOpen() {
    this.overlayOpen.next();
  }

  public showProfileSidebar() {
    this.layoutState.update(state => ({ ...state, profileSidebarVisible: true }));
  }

  public showConfigSidebar() {
    this.layoutState.update(state => ({ ...state, configSidebarVisible: true }));
  }

  public hideConfigSidebar() {
    this.layoutState.update(state => ({ ...state, configSidebarVisible: false }));
  }

  public isDesktop() {
    return window.innerWidth > 991;
  }

  public isMobile() {
    return !this.isDesktop();
  }
}
