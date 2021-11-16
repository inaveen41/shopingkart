import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { userKart } from './userkart';
import { userkart } from './kart';

@Injectable({
  providedIn: 'root'
})
export class userkartDetailsService {
  // httpClient: any;

  constructor(private httpClient: HttpClient) { }
  private baseURL="http://localhost:8080/userkart/inkart";

  getuserkartList(): Observable<userkart[]>{
    return this.httpClient.get<userkart[]>(`${this.baseURL}`);
  }

  createuserkart(kart: userkart): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,kart);
  }
  getuserkartbyId(productid: number, email:string ): Observable<userkart>{
    http://localhost:8080/userkart/inkart?id=5&emailid=naveen.immadi41@gmail.com
    return this.httpClient.get<userkart>(`${this.baseURL}/${productid}/${email}`);
    // return this.httpClient.get<userkart>("http://localhost:8080/userkart/inkart?id="+productid+"&emailid="+email);
  }

  getuserkartbyemail(email:string ): Observable<userkart>{
    http://localhost:8080/userkart/inkart?id=5&emailid=naveen.immadi41@gmail.com
    return this.httpClient.get<userkart>(`${this.baseURL}/${email}`);
    // return this.httpClient.get<userkart>("http://localhost:8080/userkart/inkart?id="+productid+"&emailid="+email);
  }


  updateuserkart(id: number, kart: userkart): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, kart);
  }

  deleteuserkart(id: number, email:string ): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}/${email}`);
  }

}