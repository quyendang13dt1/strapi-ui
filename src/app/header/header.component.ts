import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { URL_IMAGE } from '../app.config';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  headerData: any;
  URL_IMAGE = URL_IMAGE;
constructor(private _LayoutService: LayoutService) {
  this._LayoutService.getHeader().subscribe((rs: any) => {
    
    this.headerData = rs?.data;
    console.log('HeaderComponent', this.headerData);
  })
}
}
