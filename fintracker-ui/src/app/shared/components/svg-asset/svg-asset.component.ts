import { Component, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'svg-asset',
  templateUrl: './svg-asset.component.html',
  styleUrl: './svg-asset.component.scss',
  imports: []
})
export class SvgAssetComponent implements OnInit {

  @Input()
  public src: string = '';

  private httpClient = inject(HttpClient);
  private elRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  public ngOnInit() {
    this.httpClient
      .get(this.src, {responseType: 'text'})
      .subscribe(content => this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', content));
  }
}
