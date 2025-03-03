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

  getArticleDetail(id: string, status?: any) {
    return this.http.get<any[]>(
      `${URL_API}articles/${id}?customPopulate=nested&${`status=${
        status ?? ''
      }`}`
    );
  }

  getArticleDetailRelation(id: string, status?: any) {
    return this.http.get<any[]>(
      `${URL_API}articles/${id}?populate=*`
    );
  }

  getContentTypes() {
    return this.http.get<any[]>(
      `${URL_API}content-types?customPopulate=nested`
    );
  }
}
