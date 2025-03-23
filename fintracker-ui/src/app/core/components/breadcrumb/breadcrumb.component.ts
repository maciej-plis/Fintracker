import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ]
})
export class BreadcrumbComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  public breadcrumbs = signal<Breadcrumb[]>([]);

  public ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.createBreadcrumbs(this.route))
    ).subscribe(breadcrumbs => this.breadcrumbs.set(breadcrumbs));
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '/', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (!route.firstChild) {
      return breadcrumbs;
    }

    const childUrl: string = this.getRouteUrl(route.firstChild);
    if (childUrl !== '') {
      url += `/${ childUrl }`;
    }

    const data: BreadcrumbData | null = route.firstChild.snapshot.data['breadcrumb'];
    if (data?.label && route.firstChild) {
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
