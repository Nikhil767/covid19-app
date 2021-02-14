import { Component, Input } from '@angular/core';
import { faCoffee, faViruses, faFlag,faCalendarAlt, faVial, faBookDead,faHospitalUser,faUsers } from '@fortawesome/free-solid-svg-icons';
import { CountryWiseData } from 'src/app/models/countrydata';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent {

  //#region  icons
  faUsers=faUsers;
  faHospitalUser=faHospitalUser;
  faBookDead=faBookDead;
  faCoffee = faCoffee;
  faViruses = faViruses;
  faFlag = faFlag;
  faVial=faVial;
  faCalendarAlt=faCalendarAlt;
  //#endregion

  @Input() countryData: CountryWiseData = {
    code:'',
    country:'',
    day:'',
    time: Date.prototype,
    tests:{
      '1M_pop': 0,
    total: 0
    },
    deaths:{
      new:0
    },
    cases : {
      "1M_pop": 0,
      active: 0,
      critical: 0,
      recovered: 0,
      new:0
    }
  }; 

  constructor() {}

  get1Mpop(type: string){
    const value = (type == 'Cases' ? this.countryData.cases['1M_pop'] : type == 'Tests' ? this.countryData.tests['1M_pop'] : this.countryData.deaths['1M_pop'])
    return value;
  }
}
