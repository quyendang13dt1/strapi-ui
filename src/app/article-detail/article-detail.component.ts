import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_IMAGE } from '../app.config';
import { HeaderComponent } from '../header/header.component';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-article-detail',
  imports: [HeaderComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent {
  id!: string;
  detail: any;
  URL_IMAGE = URL_IMAGE;
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
    });
  }
}
