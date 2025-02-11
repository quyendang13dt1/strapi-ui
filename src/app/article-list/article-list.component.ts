import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  imports: [],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
  url = `http://localhost:1337`;
  listArticle: any = [];
  
  constructor(private _ArticleService: ArticleService, private _Router: Router, private _ActivatedRoute: ActivatedRoute,) {}
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._ArticleService.getArticleList().subscribe((rs: any) => {
      console.log('getArticleList', rs);
      this.listArticle = rs?.data;
    })
  }

  onDetail() {
    this._Router.navigate(['../detail'], {relativeTo: this._ActivatedRoute});
  }
}
