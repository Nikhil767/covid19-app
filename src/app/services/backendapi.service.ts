import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../models/countrydata';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BackendapiService {
  hostUrl = 'https://covid-193.p.rapidapi.com';
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<ResponseData>(this.hostUrl + '/countries');
  }

  getStatistics() {
    return this.http.get<ResponseData>(this.hostUrl + '/statistics');
  }

  getHistory(countryName: string, date: string = '') {
    let url = this.hostUrl + '/history';
    if (countryName) url += '?country='+ countryName;
    if (date) url += '&day='+ date;
    return this.http.get<ResponseData>(url);
  }

  // getFromCache(countryName: string, date: string = ''){
  //   let existingData = localStorage.getItem('dataSource');
  //   if(!existingData){
  //     this.getHistory(countryName, date).subscribe(x=> {
  //      if(x.response){       
  //      debugger;
  //      let groupedData = _( x.response)
  //           .filter('country')
  //           .groupBy('day')
  //           .map((value, key) => ({country: key, data: value}))
  //           .value();
  //       console.log(groupedData);
  //       localStorage.setItem(countryName+date, JSON.stringify(groupedData));
  //      }
  //     });
      
  //   }
  //   return existingData;
  // }

}
