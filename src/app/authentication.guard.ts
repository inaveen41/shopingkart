import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService } from './authguard-service.service';
import { Router } from '@angular/router';
import { CookieService } from "angular2-cookie/core";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements  CanActivate{
  constructor(private Authguardservice: AuthguardServiceService, private router: Router,private cookie:CookieService) {}

  canActivate(){
    if(localStorage.getItem('email'))
  {
    return true;
  }
  this.router.navigate(['']);
  return false;
}
}
