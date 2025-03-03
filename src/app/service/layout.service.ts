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

  knowledgeHubPopulate(status?: string | any) {
    return this.http.get<any[]>(
      `${URL_API}knowledge?populate=*&${`status=${status ?? ''}`}`
    );
  }
  knowledgeHubCustomPopulate(status?: string | any) {
    return this.http.get<any[]>(
      `${URL_API}knowledge?customPopulate=nested&${`status=${status ?? ''}`}`
    );
  }
}
