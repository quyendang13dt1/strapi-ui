import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  data: any;
  URL_IMAGE = URL_IMAGE;
  constructor(
    private _LayoutService: LayoutService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this._LayoutService.getFooter().subscribe((rs: any) => {
      console.log('getFooter-getFooter', rs);
      this.data = rs?.data;
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
