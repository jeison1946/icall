import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Environment
import { environment } from '@icall/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase = environment.apiUrl;
  

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserIcall(email: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", email);
    let url = `${this.urlBase}user`;
    return this.httpClient.get<any>(url, {params: queryParams});
  }

  createUserIcall(data: any) {
    let body = new HttpParams({
      fromObject: {
        name: data.name,
        email: data.email
      }
    });
    let url = `${this.urlBase}user`;
    return this.httpClient.post<any>(url, body);
  }
}
