import { Component, effect, Input, input, OnInit, signal } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  @Input() listBlog: any = [];
  url = `http://localhost:1337`;

  constructor(
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  onDetail() {
    this._Router.navigate(['../detail'], { relativeTo: this._ActivatedRoute });
  }
}
