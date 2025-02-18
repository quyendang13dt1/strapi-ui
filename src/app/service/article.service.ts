import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticleList() {
    return this.http.get<any[]>(`${URL_API}articles?populate=*`);
  }

  getArticleDetail(id: string) {
    return this.http.get<any[]>(
      `${URL_API}articles/${id}?customPopulate=nested`
    );
  }
}
