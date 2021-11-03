import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  login(loginPayload: { username: any; password: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
