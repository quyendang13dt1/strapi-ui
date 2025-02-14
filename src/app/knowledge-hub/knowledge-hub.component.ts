import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-knowledge-hub',
  imports: [HeaderComponent],
  templateUrl: './knowledge-hub.component.html',
  styleUrl: './knowledge-hub.component.scss'
})
export class KnowledgeHubComponent {
  url = `http://localhost:1337`;
   constructor(private _LayoutService: LayoutService, private _Router: Router, private _ActivatedRoute: ActivatedRoute,) {}
    ngOnInit(): void {
      this.getData();
    }
  
    getData() {
      this._LayoutService.knowledgeHub().subscribe((rs: any) => {
        console.log('getKnowledgeHub', rs);
      })
    }
  
    onDetail() {
      this._Router.navigate(['../detail'], {relativeTo: this._ActivatedRoute});
    }
}
