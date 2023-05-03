import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Environment
import { environment } from '@icall/environments';

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

  createUserIcall(data: any, file:Blob) {
    const formData = new FormData();
    if(file) {
      formData.append('imageFile', file, 'fileuser.jpg');
    }
    formData.append('email', data.email);
    formData.append('name', data.name);

    let url = `${this.urlBase}user`;
    return this.httpClient.post<any>(url, formData);
  }

  createFile (url: string) {
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
