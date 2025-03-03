import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { URL_IMAGE } from '../app.config';
import { HtmlRenderComponent } from '../html-render/html-render.component';
import { IframeComponent } from '../iframe/iframe.component';
import { ArticleService } from '../service/article.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  imports: [IframeComponent, HtmlRenderComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent {
  id!: string;
  detail: any;
  detailRelation: any;
  URL_IMAGE = URL_IMAGE;
  innerHTMLData: any = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private _ArticleService: ArticleService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;
    combineLatest([
      this._ArticleService
      .getArticleDetail(
        this.id,
        this._ActivatedRoute.snapshot.queryParamMap.get('status')
      ),
      this._ArticleService
      .getArticleDetailRelation(
        this.id,
        this._ActivatedRoute.snapshot.queryParamMap.get('status')
      )
    ])
      .subscribe(([rs1, rs2]: any) => {
        this.detail = rs1.data;
        this.detailRelation = rs2?.data;
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
              data: part
                .replace(
                  /<oembed url="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)"><\/oembed>/g,
                  `<iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/qLs_Ybqq324" 
                    frameborder="0" allowfullscreen></iframe>`
                )
                .replace('www.youtube.com/watch', 'www.youtube.com/embed'),
            };
          })
          .filter((x: any) => x?.data);

        // this.innerHTMLData = innerHTMLData?.concat([
        //   {
        //     type: 'iframe',
        //     src: 'https://www.youtube.com/watch?v=flmiFlJVdmA',
        //     style: '',
        //     data: `<iframe src=\"https://www.youtube.com/watch?v=flmiFlJVdmA\"></iframe>`,
        //   },
        // ]);
        console.log('this.innerHTMLData', this.detail, rs2);
        this.isLoading = false;
      });
  }

  getType(part: any) {
    // if (part?.includes('iframe')) {
    //   return 'iframe';
    // }
    return 'html';
  }
}
