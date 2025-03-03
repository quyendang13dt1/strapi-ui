import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';
import { IframeComponent } from '../iframe/iframe.component';
import { ArticleService } from '../service/article.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-knowledge-hub',
  imports: [CommonModule, IframeComponent],
  templateUrl: './knowledge-hub.component.html',
  styleUrl: './knowledge-hub.component.scss',
})
export class KnowledgeHubComponent {
  url = `http://localhost:1337`;
  URL_IMAGE = URL_IMAGE;
  knowLedHubData: any;
  filterData: any[] = [];
  listBlog: any[] = [];
  isLoading = false;

  contentTypeData: any[] = [];
  queryParamValue: any;
  constructor(
    private _LayoutService: LayoutService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _ArticleService: ArticleService
  ) {}
  ngOnInit(): void {
    this.queryParamValue =
      this._ActivatedRoute.snapshot.queryParamMap.get('status');
    this.getData();
  }

  getData() {
    this.isLoading = true;
    combineLatest([
      this._LayoutService.knowledgeHubPopulate(this.queryParamValue),
      this._LayoutService.knowledgeHubCustomPopulate(this.queryParamValue),
      this._ArticleService.getArticleList(),
    ]).subscribe(([rs1, rs2, articles]: any) => {
      this.knowLedHubData = rs2?.data;
      // this.listBlog = articles?.data;
   

      let objOrder: any = {};
      rs1?.data?.articles
        .map((x: any) => x?.documentId)
        .forEach((documentId: any, index: any) => {
          objOrder[documentId] = index;
        });
      this.listBlog = articles?.data.sort(
        (a: any, b: any) =>
          (objOrder[a.documentId] ?? Infinity) -
          (objOrder[b.documentId] ?? Infinity)
      );
      // this.filterData = this.knowLedHubData?.Filter?.Type?.map((x: any) => {
      //   x['isSelected'] = true;
      //   return x;
      // });
      // this.listBlog = this.knowLedHubData.ListBlog;
      this.isLoading = false;
    });
    this._ArticleService.getContentTypes().subscribe((rs: any) => {
      this.contentTypeData = rs?.data;
      this.filterData = [...this.contentTypeData].map(x => {
        x['isSelected'] = true;
        return x;
    });

    });
  }

  onDetail(item: any) {
    // if (item?.content_types?.some((x: any) => x?.Name !== 'Microcourse')) {
    this._Router.navigate(['../detail', item?.documentId], {
      relativeTo: this._ActivatedRoute,
    });
    //   return;
    // }
  }

  selectFilter(item: any) {
    item['isSelected'] = !item['isSelected'];
    const itemsSelected = this.filterData?.filter((x) => x?.isSelected);
    const listBlog = [...this.listBlog]?.filter((x: any) =>
      x?.content_types?.some((y: any) =>
        itemsSelected?.map((z) => z?.Name)?.includes(y?.Name)
      )
    );
    setTimeout(() => {
      this.listBlog = [...listBlog];
    });
  }
}
