
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

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
  constructor(private route: ActivatedRoute, private employeService: EmployeeService,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

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
  getImage() {
    // this.httpClient.get('http://localhost:8080/image/get/' + this.employee.emailId)
    // .subscribe(
    //   res => {
    //     this.retrieveResonse = res;
    //     this.base64Data = this.retrieveResonse.picByte;
    //     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //   }
    // );
      }
}
