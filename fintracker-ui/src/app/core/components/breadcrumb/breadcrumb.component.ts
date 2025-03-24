import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { connect } from 'ngxtension/connect';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ]
})
export class BreadcrumbComponent {

  private readonly route = inject(ActivatedRoute);

  private readonly navigationEnd$ = injectNavigationEnd();

  protected readonly breadcrumbs = signal<Breadcrumb[]>([]);

  constructor() {
    const breadcrumbs$ = this.navigationEnd$.pipe(map(() => this.createBreadcrumbs(this.route)));
    connect(this.breadcrumbs, breadcrumbs$);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (!route.firstChild) return breadcrumbs;

    const childUrl: string = this.getRouteUrl(route.firstChild);
    if (childUrl !== '') {
      url += `/${ childUrl }`;
    }

    const data: BreadcrumbData | undefined = route.firstChild.snapshot.data['breadcrumb'];
    if (data?.label) {
      breadcrumbs.push({
        label: data.label,
        url: data.disableRoute ? null : url
      });
    }

    return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
  }

  private getRouteUrl(route: ActivatedRoute): string {
    return route.snapshot.url.map(segment => segment.path).join('/');
  }
}

export interface BreadcrumbData {
  label: string | null,
  disableRoute: boolean | null
}

export interface Breadcrumb {
  label: string,
  url: string | null
}
