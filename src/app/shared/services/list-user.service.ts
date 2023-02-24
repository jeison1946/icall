import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
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

  getUserIcall() {
    let url = `${this.urlBase}user`;
    return this.httpClient.get<any>(url);
  }
}
