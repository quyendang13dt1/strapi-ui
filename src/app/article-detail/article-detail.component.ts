import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_IMAGE } from '../app.config';
import { HeaderComponent } from '../header/header.component';
import { HtmlRenderComponent } from '../html-render/html-render.component';
import { IframeComponent } from '../iframe/iframe.component';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-article-detail',
  imports: [HeaderComponent, IframeComponent, HtmlRenderComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent {
  id!: string;
  detail: any;
  URL_IMAGE = URL_IMAGE;
  innerHTMLData: any = [];
  constructor(
    private route: ActivatedRoute,
    private _ArticleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('Route Param ID:', this.id);
    this._ArticleService.getArticleDetail(this.id).subscribe((rs: any) => {
      this.detail = rs?.data;
      console.log('this._ArticleService.getArticleDetail', this.detail);

      const splitParts = this.detail?.Content.split(
        /<pre><code class="language-plaintext">|<\/code><\/pre>/
      );

      // Thay thế &lt; → < và &gt; → >
      this.innerHTMLData = splitParts
        .map((part: any) => {
          return {
            type: this.getType(part),
            src: part.match(/src="([^"]+)"/)?.[1],
            style: part.match(/style="([^"]+)"/)?.[1],
            data: part.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
          };
        })
        .filter((x: any) => x?.data);
      console.log('innerHTMLData', this.innerHTMLData);
    });
  }

  getType(part: any) {
    if (part?.includes('iframe')) {
      return 'iframe';
    }
    return 'html';
  }
}
