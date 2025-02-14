import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:1337/api/';
  constructor(private http: HttpClient) {}

  getArticleList() {
    return this.http.get<any[]>(`${this.apiUrl}articles?populate=*`);
  }

  getKnowledgeHub() {
    return this.http.get<any[]>(`http://localhost:1337/api/header`);
    
    // return this.http.get<any[]>(`${this.apiUrl}knowledge-hubs?populate=*`);
  }

}