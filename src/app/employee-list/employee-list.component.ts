import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardServiceService } from '../authguard-service.service';
import {Employee} from '../employee'
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

employees: Employee[];
emp:Employee[];
email:String;
searchedKeyword: any;

  constructor(private employeeService: EmployeeService, private router: Router,private httpClient: HttpClient, private auth: AuthguardServiceService,) { 
    if (this.auth.loggedIn) {  
      this.router.navigate(['employee']);  
    } 
    else{
      this.router.navigate(['login']);  
    } 
  }

  ngOnInit() {
    this.getEmployees();
    console.log("entered into employee list");
  }

  private getEmployees()
  {
    this.employeeService.getEmployeesList().subscribe(data =>{
      console.log("for delete 1"+this.employees);
      this.employees = data;
      console.log("for delete"+this.employees);
    });
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee',id]);
    console.log("for delete"+this.employees);
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  deleteEmployee(id: number, img:string){
    console.log("id:"+id+" img: "+img);
    this.employeeService.deleteEmployee(id).subscribe( data => {
      // this.employees=data;
      
      console.log(data);
      this.getEmployees();
    })
    console.log("delete Emplopyee");
    this.deleteimg(img);
  }
  deleteimg(img:string)
  {
    console.log("delete image");
    this.httpClient.delete('http://localhost:8080/image/delete/' + img)
    .subscribe(
      res => {
     
      }
    );
  }
}
