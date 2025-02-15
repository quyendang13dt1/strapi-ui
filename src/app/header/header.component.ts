import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerData: any;
  URL_IMAGE = URL_IMAGE;
  constructor(
    private _LayoutService: LayoutService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this._LayoutService.getHeader().subscribe((rs: any) => {
      this.headerData = rs?.data;
    });
  }

  openPages(item: any) {
    if (item?.linkRef) {
      this._Router.navigate([`/${item?.linkRef}`], {
        relativeTo: this._ActivatedRoute,
      });
    }
  }
}
