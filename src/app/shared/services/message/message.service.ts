import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Environment
import { environment } from '@icall/environments';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private urlBase = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getMessageByIdChat(id: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.set("chat", id);
    let url = `${this.urlBase}message`;
    return this.httpClient.get<any>(url, {params: queryParams});
  }

  sendMessage(data: any) {
    let body = new HttpParams({
      fromObject: {
        chat: data.chat,
        user: data.user,
        message: data.message
      }
    });
    let url = `${this.urlBase}message`;
    return this.httpClient.post<any>(url, body);
  }
}
