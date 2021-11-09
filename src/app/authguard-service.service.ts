import { Injectable } from '@angular/core';
import { CookieService } from "angular2-cookie/core";
@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {
  cookie_value:any;
  constructor(private cookie:CookieService) {

   }
   gettoken(){  
    this.cookie_value=this.cookie.get("user");
    // return !!this.cookie_value;
    return !!localStorage.getItem("SeesionUser");
    } 
    public get loggedIn(): boolean {  
      return (localStorage.getItem("currentUser") !== null);  
    }  
    logout() {  
      localStorage.removeItem('currentUser');  
      localStorage.removeItem('email');
    }  
    login()
    {
 
          this.cookie.put("currentUser", "loggedin");  
          localStorage.setItem("currentUser", "loggedin");
          this.cookie.put("login","1");
          // this.cookie.put("user",email);
          return true; 

    }
    confirm(pass:string,c_pass:string)
    {
      if(pass==c_pass)
      {
        return true;
      }
      else
      {
        return false;
      }
    } 
}
