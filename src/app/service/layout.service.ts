import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}

  getHeader() {
    return this.http.get<any[]>(`${URL_API}header?populate=*`);
  }

  getFooter() {
    return this.http.get<any[]>(`${URL_API}footer?customPopulate=nested`);
  }

  knowledgeHub() {
    return this.http.get<any[]>(
      `${URL_API}knowledge-hubs?customPopulate=nested`
    );
  }
}
