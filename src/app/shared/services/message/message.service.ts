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
    /* let fromObject: any = {
      chat: data.chat,
      user: data.user,
      message: data.message
    }
    if(data.file) {
      fromObject.file = data.file
    }
    console.log(fromObject)
    let body = new HttpParams({
      fromObject: fromObject
    }); */
    const body = new FormData();
    body.append('chat', data.chat);
    body.append('user', data.user);
    body.append('message', data.message);
    if(data.file) {
      body.append('file', data.file);
    }
    
    let url = `${this.urlBase}message`;
    return this.httpClient.post<any>(url, body);
  }
}
