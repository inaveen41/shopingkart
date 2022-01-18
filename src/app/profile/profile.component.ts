import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardServiceService } from '../authguard-service.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router,private httpClient: HttpClient, private auth: AuthguardServiceService, private employeService: EmployeeService) { 
    if (this.auth.loggedIn) {  
      this.router.navigate(['employee']);  
    } 
    else{
      this.router.navigate(['login']);  
    } 
  }
  id: number
  employee: Employee
  // httpClient: any;





  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  email:string;
  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id'];
this.id=Number(localStorage.getItem('Id'));
    this.employee = new Employee();
    this.employeService.getEmployeeById(this.id).subscribe( data => {
      console.log("data of details "+ data);
      this.employee = data;
      
      console.log(this.employee);
      this.httpClient.get('http://localhost:8080/image/get/' + this.employee.emailId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
      // console.log(this.employee.image);
    });
    console.log("get image");
    // this.getImage();
    //Make a call to Sprinf Boot to get the Image Bytes.

  }
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

}
