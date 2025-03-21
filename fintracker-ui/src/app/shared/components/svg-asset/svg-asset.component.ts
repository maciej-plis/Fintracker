import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'svg-asset',
  templateUrl: './svg-asset.component.html',
  styleUrl: './svg-asset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class SvgAssetComponent {

  public readonly src = input.required<string>();

  private readonly httpClient = inject(HttpClient);
  private readonly elRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => this.loadSvg(this.src()).subscribe(this.setInnerHtml.bind(this)));
  }

  private loadSvg(src: string): Observable<string> {
    return this.httpClient
      .get(src, {responseType: 'text'});
  }

  private setInnerHtml(content: string): void {
    this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', content);
  }
}
