import { Component, Input, OnInit } from '@angular/core';
import { ChartType as ChartControl } from 'chart.js';
import { BackendapiService } from 'src/app/services/backendapi.service';
import { Observable, Subscription } from 'rxjs';
import { INgxSelectOption } from 'ngx-select-ex';
import * as _ from 'lodash';
import { CountryWiseData } from 'src/app/models/countrydata';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  private _countryName: string = '';
  private subscriptions : Subscription[] = [];

  selectedList = 'Cases';
  selectList:string[] = ['Cases','Tests','Deaths'];

  get countryName(): any { 
    return this._countryName;
  }
  
  @Input()
  set countryName(currentValue: any) {
    this._countryName = currentValue;
    this.setFromCache(this._countryName, this.date.substr(5,2));
    // this.subscriptions.push(this.backendApi.getHistory(this._countryName, this.date).subscribe(data => {
    //   if (data?.response) {
    //     const totalCount = data.results;
    //     console.log(data.response);
    //   }
    // }));
  }

  setFromCache(countryName: string, month: string = ''){  
    let existingData = localStorage.getItem(countryName);
    if(!existingData){
      this.subscriptions.push(this.backendApi.getHistory(countryName).subscribe(x=> {
       if(x.response){
       let groupedData = _(x.response)
            .groupBy('day')
            .map((value, key) => ({date: key, data: value}))
            .value();

        localStorage.setItem(countryName, JSON.stringify(groupedData));
        let monthlyData = groupedData.filter(x=> x.date.substr(5,2) == month).flatMap(y => y.data); 
        //console.log(monthlyData); 
        this.setBarChartData(monthlyData);      
       }
      }));      
    }
    else if(existingData){
      const cachedData : {date:string, data:CountryWiseData[]}[] = JSON.parse(existingData?.toString());
      let monthlyData = cachedData.filter(x=> x.date.substr(5,2) == month).flatMap(y => y.data);
      //console.log(monthlyData);
      this.setBarChartData(monthlyData);      
    }    
  }

  setBarChartData(monthlyData : CountryWiseData[]){
    if(monthlyData){
      let testData_1Mpop = [];
      let testData_total = [];

      let deathData_1Mpop = [];
      let deathData_total = [];
      let deathData_new = [];

      let caseData_1Mpop = [];
      let caseData_total = [];
      let caseData_new = [];
      let caseData_critical = [];
      let caseData_active = [];
      let caseData_recovered = [];

      for (let index = monthlyData.length -1; index >= 0; index--) {
        const element = monthlyData[index];
        // set x-axis
        this.mbarChartLabels.push(element.day);

        // set test Data
        testData_1Mpop.push(element?.tests?.['1M_pop']);
        testData_total.push(element?.tests?.total);

        //set death data
        deathData_1Mpop.push(element?.deaths?.['1M_pop']);
        deathData_total.push(element?.deaths?.total);
        deathData_new.push(element?.deaths?.new);

        //set case data
        caseData_1Mpop.push(element?.cases?.['1M_pop']);
        caseData_total.push(element?.cases?.total);
        caseData_new.push(element?.cases?.new);
        caseData_critical.push(element?.cases?.critical);
        caseData_active.push(element?.cases?.active);
        caseData_recovered.push(element?.cases?.recovered);
      }

      this.barChartTestData = [
        {data: testData_1Mpop, label: '1M_pop'},
        {data: testData_total, label: 'Total'}
      ];
      this.barChartDeathData = [
        {data: deathData_1Mpop, label: '1M_pop'},
        {data: deathData_total, label: 'Total'},
        {data: deathData_new, label: 'New'}
      ];      
      this.barChartCaseData = [
        {data: caseData_1Mpop, label: '1M_pop'},
        {data: caseData_total, label: 'New'},
        {data: caseData_new, label: 'Total'},
        {data: caseData_critical, label: 'Critical'},
        {data: caseData_active, label: 'Active'},
        {data: caseData_recovered, label: 'Recovered'}
      ];
    }
  }

  date: string = new Date().toISOString().split('T')[0]; 

  constructor(private backendApi: BackendapiService) {}

  ngOnDestroy() {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }

  selectType(event:INgxSelectOption[]){
    if(event){
    const type = event[0]?.data;
    if(type=='Cases') this.barChartData = this.barChartCaseData;
    if(type=='Tests') this.barChartData = this.barChartTestData;
    if(type=='Deaths') this.barChartData = this.barChartDeathData;
    }
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

     mbarChartLabels:string[] = [];//['2012', '2013', '2014', '2015', '2016', '2017', '2018']
     barChartType:ChartControl = 'bar';
     barChartLegend:boolean = true;
  
     barChartColors:Array<any> = [
      {
        backgroundColor: 'rgba(105,159,177,0.2)',
        borderColor: 'rgba(105,159,177,1)',
        pointBackgroundColor: 'rgba(105,159,177,1)',
        pointBorderColor: '#fafafa',
        pointHoverBackgroundColor: '#fafafa',
        pointHoverBorderColor: 'rgba(105,159,177)'
      },
      { 
        backgroundColor: 'rgba(79,25,96,0.3)',
        borderColor: 'rgba(79,25,96,1)',
        pointBackgroundColor: 'rgba(77,20,96,1)',
        pointBorderColor: '#fbfbfb',
        pointHoverBackgroundColor: '#fbfbfb',
        pointHoverBorderColor: 'rgba(77,20,96,1)'
      },
      { 
        backgroundColor: 'rgba(77,20,96,0.3)',
        borderColor: 'rgba(77,20,96,1)',
        pointBackgroundColor: 'rgba(77,20,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,20,96,1)'
      },
      { 
        backgroundColor: 'rgba(77,20,96,0.3)',
        borderColor: 'rgba(77,20,96,1)',
        pointBackgroundColor: 'rgba(77,20,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,20,96,1)'
      },
      { 
        backgroundColor: 'rgba(92, 184, 92,0.2)',
        borderColor: 'rgba(92, 184, 92,1)',
        pointBackgroundColor: 'rgba(92, 184, 92,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(92, 184, 92)'
      }
  ];

    barChartData:any[] = [];
    barChartTestData:any[] = [
      {data: [54, 64, 45, 42, 46, 42, 40], label: '1M_pop'},
      {data: [58, 55, 60, 79, 66, 57, 90], label: 'Total'}
    ];
    barChartDeathData:any[] = [
      {data: [54, 64, 45, 42, 46, 42, 40], label: '1M_pop'},
      {data: [58, 55, 60, 79, 66, 57, 90], label: 'New'},
      {data: [58, 55, 60, 79, 66, 57, 90], label: 'Total'}
    ];
    barChartCaseData:any[] = [
      {data: [54, 64, 45, 42, 46, 42, 40], label: '1M_pop'},
      {data: [55, 60, 75, 82, 56, 62, 80], label: 'New'},
      {data: [58, 55, 60, 79, 66, 57, 90], label: 'Total'},
      {data: [58, 55, 60, 79, 66, 57, 90], label: 'Critical'},
      {data: [55, 60, 75, 82, 56, 62, 80], label: 'Active'},
      {data: [55, 60, 75, 82, 56, 62, 80], label: 'Recovered'}
    ];
  
    // events
    public chartClicked(e:any):void {
      //console.log(e);
    }
  
    public chartHovered(e:any):void {
      //console.log(e);
    }
}
