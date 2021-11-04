import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreeateEmployeeComponent } from './creeate-employee/creeate-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { KartUploadComponent } from './kart-upload/kart-upload.component';
import { LoginComponent } from './login/login.component';
// import BrowserRouter from 'react-router-dom/BrowserRouter'

import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import {AuthenticationGuard} from './authentication.guard';
const routes: Routes = [
  {path: 'employees', component: EmployeeListComponent, canActivate:[AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path:'create-employee', component: CreeateEmployeeComponent},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent},
  {path: 'kart', component: KartUploadComponent},
  {path:'home',component:HomeComponent},
  
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
