import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { userkartbyemail } from '../kart';
import { KartDetailsService } from '../kart-details.service';
import { userkartDetailsService } from '../userkart-details';

@Component({
  selector: 'app-kart',
  templateUrl: './kart.component.html',
  styleUrls: ['./kart.component.css']
})
export class KartComponent implements OnInit {

  constructor(private userkartdetails: userkartDetailsService, private kartdetails: KartDetailsService,private httpClient: HttpClient) { }
email:string;
i:number=0;
userkart:userkartbyemail[]=[];
retrieveResonse: any;
base64Data:any;
 title:any;
image:any=[];
gtotal:number=0;
length:number;
// public userkart:Array<userkartbyemail> = [];
// userkart: userkartbyemail = new userkartbyemail();
  ngOnInit() {
    this.gtotal=0;
    this.email=localStorage.getItem('email');
    this.userkartdetails.getuserkartbyemail(this.email).subscribe(data =>{
      console.log(data);
      // this.userkart=data;
      
      // console.log("usert kart"+this.userkart)
      
     
      // console.log("user kart afte radding ="+this.userkart[0]);
      this.length=this.userkart.length;
      
      // console.log("user kart lenth = "+this.userkart.length)
     
      for(this.i=0;this.i<this.userkart.length;this.i++)
      {
        // console.log("i="+this.i)
        // this.getdetails(Number(this.userkart[this.i].productid),this.i, this.userkart[this.i].quantity)
      }

    });




  
  }
  getdetails(id:number,i:number,quan:number)

  {
    
  //   // console.log("user kart id = "+id)
  //         // console.log(" i1 = "+i)
  //         // console.log("product id2 = "+this.userkart[this.i].productid)
  //         this.httpClient.get('http://localhost:8080/setkart/kart/' + this.userkart[this.i].productid)
  //         .subscribe(
  //           res => {
  //             // console.log(" i in get = "+i)
  //             // console.log("product id in get = "+id)
  //             this.retrieveResonse = res;

  //             // console.log("res = "+this.retrieveResonse.title);
  //             this.image=res;
             
  //             this.userkart[i].title=this.retrieveResonse.title.toString();
  //             this.userkart[i].description=this.retrieveResonse.description.toString();
        
              
  //             this.base64Data = this.retrieveResonse.image;
  //             this.userkart[i].image = 'data:image/jpeg;base64,' + this.base64Data;
  //             // console.log("gtotal before = "+this.gtotal);
  //             // console.log("product price is = "+this.retrieveResonse.price);
  //             this.gtotal=this.gtotal+(quan*this.retrieveResonse.price);
  //             // console.log("gtotal after = "+this.gtotal);
  //             // console.log
  //           }
  //         );
  }

  akart(id:number, price:number, i:number)
  {
this.email=localStorage.getItem('email');
    this.userkartdetails.getuserkartbyId(id,this.email).subscribe(data =>{
 
      

      if(data[0].productid==id)
      {
        
        data[0].quantity++;
        // data[0].price=data[0].price*data[0].quantity;
        this.userkart[i].quantity=data[0].quantity;
        this.userkart[i].price=data[0].price*data[0].quantity;
      this.gtotal=this.gtotal+data[0].price;
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

  dkart(id:number, price:number, i:number)
  {
this.email=localStorage.getItem('email');
    this.userkartdetails.getuserkartbyId(id,this.email).subscribe(data =>{


      if(data[0].productid==id)
      {
        
        data[0].quantity--;

        // data[0].price=data[0].price*data[0].quantity;
        this.userkart[i].quantity=data[0].quantity;
        this.userkart[i].price=data[0].price*data[0].quantity;
        this.gtotal=this.gtotal-data[0].price;
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

  del(id:number,price:number)
  {
    console.log("price before deletin = "+this.gtotal);
    // console.log("product id to delete = "+id)
    this.userkartdetails.deleteuserkart(id,localStorage.getItem('email')).subscribe( data => {
      // this.employees=data;
      
      console.log(data);
      console.log("price of eleting iteam = "+price)
     
      this.gtotal=this.gtotal-price;
      console.log("price before deletin = "+this.gtotal);
      this.ngOnInit();
    })
 
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.gtotal
    // this.ngOnInit();
  }
}
