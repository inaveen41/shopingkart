import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {



 

  id: number;
  confirmPassword:string;
  emailerror:string;
  passerror:string;
  employee: Employee = new Employee();
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  selectedFile: any;
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
   this.employee = data;
   this.confirmPassword=this.employee.password;
   console.log("updated email id in ongo: "+ this.employee.emailId);
   this.httpClient.get('http://localhost:8080/image/get/' + this.employee.emailId)
   .subscribe(
     res => {
       this.retrieveResonse = res;
       this.base64Data = this.retrieveResonse.picByte;
       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
     }
   );
    }, 
    error => console.log(error));


  }
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log("file selcted "+ this.selectedFile.name);
    console.log(this.selectedFile);
    
   
    // this.employee.image=this.selectedFile;
    
  }
  updateimage(img:string)
  {
    console.log("updation started");
    const uploadImageData = new FormData();
 uploadImageData.append('imageFile', this.selectedFile, this.employee.emailId);
    console.log("upload image data"+ uploadImageData);
    this.httpClient.put('http://localhost:8080/image/update/' + img,uploadImageData)
    .subscribe(
      res => {
     
      }
    );
  }
  onSubmit(){
    this.updateimage(this.employee.emailId);
    if(this.employee.password==this.confirmPassword)
    {

      console.log("updated email id: "+ this.employee.emailId);
    this.employeeService.updateEmployee(this.id, this.employee).subscribe( data =>{
      this.goToEmployeeList();
    }
    , error =>{
      if(error.status==500)
      {
        this.emailerror="email alredy exist";
      }
      console.log(error);
    });





  }
  else{
    this.passerror="password dosen't match";
  }
}

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}
