import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KartDetailsService } from '../kart-details.service';
import { Kart } from '../kart';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-kart-upload',
  templateUrl: './kart-upload.component.html',
  styleUrls: ['./kart-upload.component.css']
})
export class KartUploadComponent implements OnInit {
  selectedFile: any;

  constructor(private router: Router, private httpClient: HttpClient, private kartdetails:KartDetailsService, private auth: AuthguardServiceService) { 
    if (this.auth.loggedIn) {  
      this.router.navigate(['upload_to_kart']);  
    } 
    else{
      this.router.navigate(['login']);  
    } 
  }
  kart: Kart = new Kart();
  ngOnInit() {
  }

  savekart()
  {
    // this.upload();
    // console.log("kart= "+this.kart.image);
    // this.kart.image=this.selectedFile;
    this.kartdetails.createkart(this.kart).subscribe( data =>{
      console.log(data);
      this.gotohome()
    

    },
    error => {

  }  
      );
  }

  gotohome()
  {
    this.router.navigate(['/home']);
  }


  upload()
  {
 //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
 const uploadImageData = new FormData();
 uploadImageData.append('imageFile', this.selectedFile);
 uploadImageData.append('title',this.kart.title);
 uploadImageData.append('description',this.kart.description);
 uploadImageData.append('quantity',this.kart.quantity.toString());
 uploadImageData.append('price',this.kart.price.toString());
 uploadImageData.append('rating',this.kart.rating.toString());
 uploadImageData.append('no_of_ratings',this.kart.no_of_ratings.toString());
 //Make a call to the Spring Boot Application to save the image
 this.httpClient.post('http://localhost:8080/setkart/kart', uploadImageData, { observe: 'response' })
   .subscribe((response) => {
     if (response.status == 500) {
    
     error=>{
       if(error.status==500)
       {
        //  this.imagerror=500;
        //  this.errorimage="image is not accepted";
       console.log("error status 500: "+response.status);
       }
     }
   }
  }
   );
  }

  
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log("file selcted "+ this.selectedFile.name);
    console.log(this.selectedFile);
    
   
    // this.employee.image=this.selectedFile;
    
  }
  onSubmit()
  {
    // this.savekart();
    this.upload();
  }
}
