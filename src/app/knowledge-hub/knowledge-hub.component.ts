import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';

@Component({
  selector: 'app-knowledge-hub',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './knowledge-hub.component.html',
  styleUrl: './knowledge-hub.component.scss',
})
export class KnowledgeHubComponent {
  url = `http://localhost:1337`;
  URL_IMAGE = URL_IMAGE;
  knowLedHubData: any;
  constructor(
    private _LayoutService: LayoutService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._LayoutService.knowledgeHub().subscribe((rs: any) => {
      console.log('getKnowledgeHub', rs);
      this.knowLedHubData = rs?.data?.[0];
    });
  }

  onDetail(item: any) {
    if (item?.content_types?.some((x: any) => x?.Name === 'Article')) {
      this._Router.navigate(['../detail', item?.article?.documentId], {
        relativeTo: this._ActivatedRoute,
      });
      return;
    }
  }
}
