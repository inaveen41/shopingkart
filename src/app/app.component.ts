import { Component } from '@angular/core';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KartDetailsService } from './kart-details.service';
import { Kart } from './kart';
import { AuthguardServiceService } from './authguard-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-frontend';
  constructor(private httpClient: HttpClient, private cookie:CookieService,private route: ActivatedRoute,private kartdetails:KartDetailsService, private auth: AuthguardServiceService,private router:Router,) {
    if(this.auth.loggedIn)
    {
      this.log_val=1;
    }
    else{
      this.log_val=0;
    }
   }
  log:string="1";
  log_val:number=0;
  nv:string="hello";
  level:number;
 user=0;
  ngOnInit() {
    // this.getlist();
    // this.log;
    this.log_val=Number(localStorage.getItem("SessionUser"));
    console.log("log_val = "+localStorage.getItem("SessionUser"));
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(localStorage.getItem("currentUser")==null)
    {
      this.log_val=0;
    }
    if(localStorage.getItem("level")=="4")
    {
      this.level=4;
    }
  }




  logout()
  {

    this.auth.logout()
    localStorage.setItem("level","0");
    this.router.navigate(['/home']); 
    this.cookie.put("login","0");
    localStorage.setItem("login","0");
    console.log("loged out");
    localStorage.setItem('SessionUser','0');
    localStorage.removeItem('email');
  }
}
