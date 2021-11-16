import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kart } from './kart';

@Injectable({
  providedIn: 'root'
})
export class KartDetailsService {
  // httpClient: any;

  constructor(private httpClient: HttpClient) { }
  private baseURL="http://localhost:8080/setkart/kart";

  getKartList(): Observable<Kart[]>{
    return this.httpClient.get<Kart[]>(`${this.baseURL}`);
  }

  createkart(kart: Kart): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,kart);
  }


  getkartbyId(id: number): Observable<Kart[]>{
    return this.httpClient.get<Kart[]>(`${this.baseURL}/${id}`);
  }
  
}
