import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  countryList: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  getAllCountries(countries: string[]) {
    if (countries) {
      this.countryList = countries;
    }
  }

  onSelect(countryName: any){
    //console.log(countryName);
  }
}
