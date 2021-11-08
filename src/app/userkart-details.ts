import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userKart } from './userkart';

@Injectable({
  providedIn: 'root'
})
export class userkartDetailsService {
  // httpClient: any;

  constructor(private httpClient: HttpClient) { }
  private baseURL="http://localhost:8080/userkart/inkart";

  getuserkartList(): Observable<userKart[]>{
    return this.httpClient.get<userKart[]>(`${this.baseURL}`);
  }

  createuserkart(kart: userKart): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,kart);
  }
}