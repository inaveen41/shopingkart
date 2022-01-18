import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-creeate-employee',
  templateUrl: './creeate-employee.component.html',
  styleUrls: ['./creeate-employee.component.css']
})
export class CreeateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  err:number;
  pas_err:string;
  msg:string;
  confirmPassword:string;
  password;
  show = false;
  imagerror: number;
  errorimage:string;
  email:string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  image:File;


  constructor(private employeeService: EmployeeService, private router: Router, private httpClient: HttpClient,private auth: AuthguardServiceService) { 
    if (this.auth.loggedIn) {  
      this.router.navigate(['create-employee']);  
    } 
    else{
      this.router.navigate(['login']);  
    } 
  }

  ngOnInit() {
    this.password = 'password';
  }

  saveEmployee(){
      this.employeeService.createEmployee(this.employee).subscribe( data =>{
        console.log(data);
        this.goToEmployeeList();
        this.msg="";
      },
      error => {if(error.status==500)
      {
        this.msg="email already exist";
  
        console.log(error)
      }
      else if(error.status==415)
      {
        this.imagerror=415;
        console.log(415);
        this.errorimage="image file type is not supported";
      }
  
    }  
        );
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit()
  {
    console.log(this.employee);
    console.log("hello");
    if(this.confirmPassword== this.employee.password && this.imagerror!=415)
    {
      this.email=this.employee.emailId;
      console.log(this.email);
      
      this.upload();
      if(this.imagerror!=500)
      {
        this.saveEmployee();
      }
      console.log("immage uploade"+ this.imagerror);
      // this.pas_err="";
    }
    else
    {
      this.pas_err="password dosen't match";
      this.errorimage="Image size is to large or not supported";
    }
    

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
  

  // //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log("file selcted "+ this.selectedFile.name);
    console.log(this.selectedFile);
    
   
    // this.employee.image=this.selectedFile;
    
  }
  upload()
  {
 //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
 const uploadImageData = new FormData();
 uploadImageData.append('imageFile', this.selectedFile, this.employee.emailId);

 //Make a call to the Spring Boot Application to save the image
 this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
   .subscribe((response) => {
     if (response.status == 500) {
      this.imagerror=500;
      this.errorimage="image is not accepted";
       this.message = 'Image uploaded successfully';
     } else {
       this.message = 'Image not uploaded successfully';
     }
     error=>{
       if(error.status==500)
       {
         this.imagerror=500;
         this.errorimage="image is not accepted";
       console.log("error status 500: "+response.status);
       }
     }
   }
   );
  }


 //Gets called when the user clicks on retieve image button to get the image from back end
 getImage() {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}

}
