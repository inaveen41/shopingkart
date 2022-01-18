import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreeateEmployeeComponent } from './creeate-employee/creeate-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home/home.component';
// import { CookieService } from 'ngx-cookie-service';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { AuthguardServiceService } from './authguard-service.service';
import { KartUploadComponent } from './kart-upload/kart-upload.component';
// import { HttpModule } from '@angular/http';
// import { NgModule } from '@angular/core';  
// import {Routes, RouterModule } from '@angular/router';  
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { KartComponent } from './kart/kart.component';
import { ProfileComponent } from './profile/profile.component';
const config: SocketIoConfig = { 
  url: 'https://inaveen41.github.io/shopingkart/', options: {}
};
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreeateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    LoginComponent,
    HomeComponent,
    KartUploadComponent,
    KartComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    SocketIoModule.forRoot(config)
    // RouterModule.forRoot(routes),
    
  ],

  providers: [CookieService,
  AuthguardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
