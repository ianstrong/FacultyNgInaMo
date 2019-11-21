import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL = 'http://localhost/apiFP/'

  constructor(private http: HttpClient) { }

  pullData(method, data) {
    return this.http.post<any>(this.apiURL + method, btoa(JSON.stringify(data)));
  }

  pushFile(method, data) {
    return this.http.post<any>(this.apiURL + method, data);
  }
}
