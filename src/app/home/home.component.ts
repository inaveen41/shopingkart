import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { Kart, userkart } from '../kart';
import { KartDetailsService } from '../kart-details.service';
// import { userKart } from '../userkart';
import { userkartDetailsService } from '../userkart-details';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient, private cookie:CookieService,private route: ActivatedRoute,private kartdetails:KartDetailsService, private userkartdetails: userkartDetailsService) { }
  kart:Kart[];
  email:string;
  // kart1: Kart= new Kart();
  // userkart: userKart = new userKart();
  userkart: userkart = new userkart();
  got:boolean;
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
this.email=localStorage.getItem('email');
    this.userkartdetails.getuserkartbyId(id,this.email).subscribe(data =>{
      console.log(data);
      console.log(length);
      console.log(data.length);
      [0]
      

      if(data.length==0)
      {
        console.log("this product dose not exist");
        console.log(id, price);
        this.userkart.emailid=this.email;
        this.userkart.productid=id;
        this.userkart.quantity=1;
        this.userkart.price=price;
        console.log(this.userkart);
        this.uploadtokart();
      }
      else if(data[0].productid==id)
      {
        console.log(data.id);
        console.log(data[0].productid);
        console.log(data[0].id);
        console.log("the product already exist");
        data[0].quantity++;
        data[0].price=data[0].price*data[0].quantity;
        console.log(data[0].quantity)
        console.log(data[0].price)
        console.log(data)
        this.userkartdetails.updateuserkart(data[0].id, data[0]).subscribe( data =>{
          // this.goToEmployeeList();
        }
        , error =>{
          if(error.status==500)
          {
            // this.emailerror="email alredy exist";
          }
          console.log(error);
        });
      }
      else{
     
      }
    },
    error => {if(error.status==200)
      {
        console.log("fouind the user and products");

      }

    });



  
  }
  
uploadtokart()
{

 
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
