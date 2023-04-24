import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Environment
import { environment } from '@icall/environments';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {
  private urlBase = environment.apiUrl;
  

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserIcall(user: string = '', exluid_user: string = '') {
    let queryParams = new HttpParams();
    if(user) {
      queryParams = queryParams.append("email", user);
    }
    if(exluid_user) {
      queryParams = queryParams.append("excluid_user", exluid_user);
    }
    let url = `${this.urlBase}user`;
    return this.httpClient.get<any>(url, {params: queryParams});
  }
}
