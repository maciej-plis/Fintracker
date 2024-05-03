import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  public breadcrumbs: Observable<Breadcrumb[]>;

  public ngOnInit(): void {
    this.breadcrumbs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.createBreadcrumbs(this.route))
    );
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

interface BreadcrumbData {
  label: string | null,
  disableRoute: boolean | null
}

interface Breadcrumb {
  label: string,
  url: string | null
}
