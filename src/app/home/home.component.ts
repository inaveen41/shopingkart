import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { Kart } from '../kart';
import { KartDetailsService } from '../kart-details.service';
import { userKart } from '../userkart';
import { userkartDetailsService } from '../userkart-details';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient, private cookie:CookieService,private route: ActivatedRoute,private kartdetails:KartDetailsService, private userkartdetails: userkartDetailsService) { }
  kart:Kart[];
  kart1: Kart= new Kart();
  userkart: userKart = new userKart();
  ngOnInit() {
    this.getlist();
  }
  private getlist()
  {
    this.kartdetails.getKartList().subscribe(data =>{
      // console.log("for delete 1"+this.employees);
      this.kart = data;
      // this.kart1=this.kart;
      // console.log("for delete"+this.employees);
    });
  }

  addkart(id:number, price:number)
  {
    this.userkart.emailid=localStorage.getItem('email');
    this.userkart.productid=id;
    this.userkart.quantity=1;
    this.userkart.price=price;
    this.userkartdetails.createuserkart(this.userkart).subscribe( data =>{
      console.log(data);
      // this.goToEmployeeList();
      // this.msg="";
    },
    error => {if(error.status==500)
    {
      // this.msg="email already exist";

      console.log(error);
    }
  }
    );
  }
  


}
