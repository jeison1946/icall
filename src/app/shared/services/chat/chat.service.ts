import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Environment
import { environment } from '@icall/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private urlBase = environment.apiUrl;
  

  constructor(
    private httpClient: HttpClient
  ) { }

  getChatsById(id: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.set("user", id);
    let url = `${this.urlBase}chat`;
    return this.httpClient.get<any>(url, {params: queryParams});
  }

  createdChat(user: Array<any>) {
    let body = new HttpParams({
      fromObject: {
        users: user
      }
    });
    let url = `${this.urlBase}chat`;
    return this.httpClient.post<any>(url, body);
  }
}
