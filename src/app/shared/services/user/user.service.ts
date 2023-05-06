import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Environment
import { environment } from '@icall/environments';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase = environment.apiUrl;

  public fileBlob: File | undefined;
  

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
        email: data.email,
        name: data.name,
        imageFile: data.photoUrl
      }
    });

    let url = `${this.urlBase}user`;
    return this.httpClient.post<any>(url, body);
  }

  statusUser(idToken: string) {
    const headers = {
      'Authorization': `Bearer ${idToken}`
    }

    let url = `${this.urlBase}user/status`;
    return this.httpClient.get<any>(url, {headers: headers});
  }
}
