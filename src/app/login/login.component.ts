import { Component, OnInit, HostBinding  } from '@angular/core';
import { trigger, state, style, animate, transition, animateChild, query } from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { Employee } from '../employee';
import { HttpClient } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthguardServiceService } from '../authguard-service.service';
// import studentsData from 'C:\Users\DELL\angular-frontend\src\students.json';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [

    trigger('openClose', [
      // ...
      state('open', style({

        opacity: 1,
         transform: 'translateY(0)'        
       
      })),
      state('closed', style({

        opacity: 0,
         transform: 'translateY(10px)',
        backgroundColor: 'none'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    


    trigger('enterExitLeft', [
      transition(':enter', [
          style({ opacity: 0, transform: 'translateX(-200px)' }),
          animate(
              '500ms ease-in',
              style({ opacity: 1, transform: 'translateX(0)' })
          ),
    ]),
    transition(':leave', [
          animate(
              '500ms ease-in',
              style({ opacity: 0, transform: 'translateX(-200px)' })
          ),
    ]),
  ]),

  trigger('enterExitRight', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(200px)' }),
        animate(
            '500ms ease-in',
            style({ opacity: 1, transform: 'translateX(0)' })
        ),
    ]),
    transition(':leave', [
        animate(
            '500ms ease-in',
            style({ opacity: 0, transform: 'translateX(200px)' })
      ),
    ]),
]),


trigger('container', [
  transition(':enter, :leave', [
    query('@*', animateChild()),
  ]),
]),



  ]
})
export class LoginComponent implements OnInit {
  employee: Employee
  email:string;
  show: boolean;
  password;
  user_password:string;
  cookie_value:any;
  // route: any;
  id: any;
  user='1';
  log:boolean;

  constructor(private httpClient: HttpClient, private cookie:CookieService,private route: ActivatedRoute, private auth: AuthguardServiceService, private router:Router) { 
    if (this.auth.loggedIn) {  
      this.router.navigate(['home']);  
    } 
    else{
      this.router.navigate(['login']);  
    } 
  }

  ngOnInit() {
    this.password = 'password';
    this.id = this.route.snapshot.params['id'];
   
 
  }

  isOpen = true;
  getCookie(key: string) {
    return this.cookie.get(key);
  }

open()
{
  this.employee = new Employee();

  this.httpClient.get<Employee>('http://localhost:8080/api/v1/login/' + this.email)
  .subscribe( data => {
    this.employee=data;
    // console.log("while login employee details are: "+this.employee);
    console.log("employee password = "+this.employee.password+"entered password : "+this.user_password);
    if(this.employee.password==this.user_password)
    {
     this.log=this.auth.login();
    //  localStorage.set("currentUser", "loggedin");  
 
     if(this.log)
     {
      this.router.navigate(["home"]);  
     }
      this.isOpen = !this.isOpen;
      localStorage.setItem("login","1");
      localStorage.setItem("level",this.employee.level.toString());
      localStorage.setItem("Id",this.employee.id.toString());
      localStorage.setItem('SessionUser',this.user);
      localStorage.setItem('email',this.employee.emailId);
      localStorage.setItem('first_name',this.employee.firstName);
      // console.log("SessionUser value = " + localStorage.getItem("Sess"))
      this.cookie.put("user", this.employee.emailId);
      this.cookie_value=this.cookie.get("user");
      this.cookie.put("login", "1"); 
      console.log("Set Test Cookie as Test"+this.cookie_value);
    }
   
      }
    );

  }



onClick() {
  if (this.password === 'password') {
    this.password = 'text';
    this.show = true;
  } else {
    this.password = 'password';
    this.show = false;
  }
}

}
