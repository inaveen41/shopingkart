import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { Kart } from '../kart';
import { KartDetailsService } from '../kart-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient, private cookie:CookieService,private route: ActivatedRoute,private kartdetails:KartDetailsService) { }
  kart:Kart[];
  ngOnInit() {
    this.getlist();
  }
  private getlist()
  {
    this.kartdetails.getKartList().subscribe(data =>{
      // console.log("for delete 1"+this.employees);
      this.kart = data;
      // console.log("for delete"+this.employees);
    });
  }

}
