import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';
import { IframeComponent } from '../iframe/iframe.component';

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
  constructor(
    private _LayoutService: LayoutService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    const queryParamValue = this._ActivatedRoute.snapshot.queryParamMap.get('status');
    console.log('queryParamValue', queryParamValue);
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this._LayoutService.knowledgeHub().subscribe((rs: any) => {
      this.knowLedHubData = rs?.data?.[0];
      this.filterData = this.knowLedHubData?.Filter?.Type?.map((x: any) => {
        x['isSelected'] = true;
        return x;
      });
      this.listBlog = this.knowLedHubData.ListBlog;
      this.isLoading = false;
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
