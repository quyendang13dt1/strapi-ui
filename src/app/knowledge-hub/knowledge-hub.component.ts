import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';
import { IframeComponent } from '../iframe/iframe.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-knowledge-hub',
  imports: [CommonModule, HeaderComponent, IframeComponent, FooterComponent],
  templateUrl: './knowledge-hub.component.html',
  styleUrl: './knowledge-hub.component.scss',
})
export class KnowledgeHubComponent {
  url = `http://localhost:1337`;
  URL_IMAGE = URL_IMAGE;
  knowLedHubData: any;
  filterData: any[] = [];
  listBlog: any[] = [];
  constructor(
    private _LayoutService: LayoutService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._LayoutService.knowledgeHub().subscribe((rs: any) => {
      this.knowLedHubData = rs?.data?.[0];
      this.filterData = this.knowLedHubData?.Filter?.Type?.map((x: any) => {
        x['isSelected'] = true;
        return x;
      });
      this.listBlog = this.knowLedHubData.ListBlog;
    });
  }

  onDetail(item: any) {
    if (item?.content_types?.some((x: any) => x?.Name !== 'Microcourse')) {
      this._Router.navigate(['../detail', item?.article?.documentId], {
        relativeTo: this._ActivatedRoute,
      });
      return;
    }
  }

  selectFilter(item: any) {
    item['isSelected'] = !item['isSelected'];
    const itemsSelected = this.filterData?.filter((x) => x?.isSelected);
    const listBlog = this.knowLedHubData.ListBlog?.filter((x: any) =>
      x?.content_types?.some((y: any) =>
        itemsSelected?.map((z) => z?.Text)?.includes(y?.Name)
      )
    );
    setTimeout(() => {
      this.listBlog = [...listBlog];
    });
  }
}
