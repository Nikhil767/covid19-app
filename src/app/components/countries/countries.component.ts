import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { ValidExtraData } from 'countries-map/lib/data-types.interface';
import { INgxSelectOption } from 'ngx-select-ex';
import { Subscription } from 'rxjs';
import { CountryCode} from 'src/app/models/countrycode';
import { CountryWiseData } from 'src/app/models/countrydata';
import { BackendapiService } from 'src/app/services/backendapi.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent {
  
  private subscriptions : Subscription[] = [];
  
  isWorldMap = true;
  selectedCountryData : any;
  getMapTitle(){ return this.isWorldMap ?'World Map':'Country Map'};

  //#region world Map
  casesColor : string='#5bc0de';
  testsColor : string='#5cb85c';
  deathsColor : string='#d9534f';
  notInfectedColor : string='#292b2c';

  chartType :ChartType = ChartType.GeoChart;
  chartOption = {
    datalessRegionColor: this.notInfectedColor,
    legend: 'none',
    // tooltip: {
    //   showColorCode:true,
    //   isHtml: true,
    //   textStyle: {
    //     color: 'black',
    //     fontSize: 12
    //   }
    // },
    height: 380,
    colors: ['#46127A'],     
    enableRegionInteractivity: 'true',    
    sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
    region:'world',
    displayMode: 'regions',
    resolution: 'countries',
    keepAspectRatio: true,
    colorAxis: {colors: ['#5bc0de', '#4374e0']}
  }

  worldDataToShow :ValidExtraData[][] = [];
  selectedCountry: string = '';
  countryList: string[] = [];

  columns = ['Country','Cases'];
  previoustype = 'Cases';
  uncheckableRadioModel = 'Cases';
  mappedCountryList: CountryWiseData[] = [];
  //#endregion world Map

  //#region country map
  myType :ChartType = ChartType.GeoChart;
  countryData:ValidExtraData[][] = [];
  // countryData = [
  //   ['Country', 'Popularity'],
  //   ['London', 8136000],
  //   ['New York', 8538000],
  //   ['Paris', 2244000],
  //   ['Berlin', 3470000],
  //   ['Kairo', 19500000]
  // ];

  countrychartOption : any = {
    displayMode: 'text'
  };
  //#endregion

  constructor(private backendApi: BackendapiService) {
    this.chartOption.colors = [];
    // get country names for dropdown
    // this.backendApi.getCountries().subscribe((data) => {
    //   if (data?.response) {
    //     this.setCountryList(data.response);
    //   }
    // });

    // get Statistics for all countries
    this.subscriptions.push(this.backendApi.getStatistics().subscribe(data => {
      if (data?.response) {
        this.mapCountryNameswithCode(data.response);
      }
    }));
  }

  //#region  world Map
  // set search bar with country names
  setCountryList(countryList: any) {
    this.countryList = countryList;
  }

  // set chart background color
  getBackgroundColor(){
    return this.notInfectedColor;
  }

  // search bar selected country
  selectCountry(countryName: INgxSelectOption[]){
    const currentCountry = countryName[0]?.data;
    if(currentCountry?.code){
        this.selectedCountryData = currentCountry;
        // this.countryData = [
        //   ['Country', 'Cases'],
        //   [currentCountry.country, currentCountry?.cases?.total]
        // ];
        this.isWorldMap = false;
        this.countrychartOption = {
          displayMode: 'text',
          region: currentCountry.code,
          height: 380,
          backgroundColor: this.casesColor,
          resolution: 'provinces',
          noDataColor:'red',
          colors: ['#46127A'],
          keepAspectRatio: true,
          datalessRegionColor: this.testsColor,  
          colorAxis: {colors: ['red', 'red']}       
        }
    }else{
      this.isWorldMap = true;
    }
  }
   
  mapCountryNameswithCode(countriesStatistics: CountryWiseData[]) {
    const totalCount = countriesStatistics.length;
    const casematrix = new Array(totalCount).fill(0).map(() => new Array(2).fill(0));
    for (let index = 0; index < countriesStatistics.length; index++) {
        const countryData = countriesStatistics[index];
        let countryName = countryData.country;
        countryData.countryOriginal = countryName;
        countryName = countryName.replace(/-/g, " ");
        const countryCode = this.countryCodes[countryName];
        countryData.country = countryName;
        countryData.code = countryCode;
        casematrix[index] = [countryName, countryData?.cases?.total];
          if(countryData.code){
            this.mappedCountryList.push(countryData);      
          }
    }
    this.worldDataToShow = casematrix;
  }
  //#endregion world Map


  //#region country map
  setCountryData(){

  }

  //#endregion country map
 
  ngOnDestroy() {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }

  countryCodes : CountryCode = {
    "Afghanistan":"AF",
    "Aland Islands":"AX",
    "Albania":"AL",
    "Algeria":"DZ",
    "American Samoa":"AS",
    "Andorra":"AD",
    "Angola":"AO",
    "Anguilla":"AI",
    "Antarctica":"AQ",
    "Antigua And Barbuda":"AG",
    "Argentina":"AR",
    "Armenia":"AM",
    "Aruba":"AW",
    "Australia":"AU",
    "Austria":"AT",
    "Azerbaijan":"AZ",
    "Bahamas":"BS",
    "Bahrain":"BH",
    "Bangladesh":"BD",
    "Barbados":"BB",
    "Belarus":"BY",
    "Belgium":"BE",
    "Belize":"BZ",
    "Benin":"BJ",
    "Bermuda":"BM",
    "Bhutan":"BT",
    "Bolivia":"BO",
    "Bosnia And Herzegovina":"BA",
    "Botswana":"BW",
    "Bouvet Island":"BV",
    "Brazil":"BR",
    "British Indian Ocean Territory":"IO",
    "Brunei Darussalam":"BN",
    "Bulgaria":"BG",
    "Burkina Faso":"BF",
    "Burundi":"BI",
    "Cambodia":"KH",
    "Cameroon":"CM",
    "Canada":"CA",
    "Cape Verde":"CV",
    "Cayman Islands":"KY",
    "Central African Republic":"CF",
    "Chad":"TD",
    "Chile":"CL",
    "China":"CN",
    "Christmas Island":"CX",
    "Cocos (Keeling) Islands":"CC",
    "Colombia":"CO",
    "Comoros":"KM",
    "Congo":"CG",
    "Congo, Democratic Republic":"CD",
    "Cook Islands":"CK",
    "Costa Rica":"CR",
    "Cote D\"Ivoire":"CI",
    "Croatia":"HR",
    "Cuba":"CU",
    "Cyprus":"CY",
    "Czech Republic":"CZ",
    "Denmark":"DK",
    "Djibouti":"DJ",
    "Dominica":"DM",
    "Dominican Republic":"DO",
    "Ecuador":"EC",
    "Egypt":"EG",
    "El Salvador":"SV",
    "Equatorial Guinea":"GQ",
    "Eritrea":"ER",
    "Estonia":"EE",
    "Ethiopia":"ET",
    "Falkland Islands (Malvinas)":"FK",
    "Faroe Islands":"FO",
    "Fiji":"FJ",
    "Finland":"FI",
    "France":"FR",
    "French Guiana":"GF",
    "French Polynesia":"PF",
    "French Southern Territories":"TF",
    "Gabon":"GA",
    "Gambia":"GM",
    "Georgia":"GE",
    "Germany":"DE",
    "Ghana":"GH",
    "Gibraltar":"GI",
    "Greece":"GR",
    "Greenland":"GL",
    "Grenada":"GD",
    "Guadeloupe":"GP",
    "Guam":"GU",
    "Guatemala":"GT",
    "Guernsey":"GG",
    "Guinea":"GN",
    "Guinea-Bissau":"GW",
    "Guyana":"GY",
    "Haiti":"HT",
    "Heard Island & Mcdonald Islands":"HM",
    "Holy See (Vatican City State)":"VA",
    "Honduras":"HN",
    "Hong Kong":"HK",
    "Hungary":"HU",
    "Iceland":"IS",
    "India":"IN",
    "Indonesia":"ID",
    "Iran, Islamic Republic Of":"IR",
    "Iraq":"IQ",
    "Ireland":"IE",
    "Isle Of Man":"IM",
    "Israel":"IL",
    "Italy":"IT",
    "Jamaica":"JM",
    "Japan":"JP",
    "Jersey":"JE",
    "Jordan":"JO",
    "Kazakhstan":"KZ",
    "Kenya":"KE",
    "Kiribati":"KI",
    "Korea":"KR",
    "North Korea":"KP",
    "Kuwait":"KW",
    "Kyrgyzstan":"KG",
    "Lao People\"s Democratic Republic":"LA",
    "Latvia":"LV",
    "Lebanon":"LB",
    "Lesotho":"LS",
    "Liberia":"LR",
    "Libyan Arab Jamahiriya":"LY",
    "Liechtenstein":"LI",
    "Lithuania":"LT",
    "Luxembourg":"LU",
    "Macao":"MO",
    "Macedonia":"MK",
    "Madagascar":"MG",
    "Malawi":"MW",
    "Malaysia":"MY",
    "Maldives":"MV",
    "Mali":"ML",
    "Malta":"MT",
    "Marshall Islands":"MH",
    "Martinique":"MQ",
    "Mauritania":"MR",
    "Mauritius":"MU",
    "Mayotte":"YT",
    "Mexico":"MX",
    "Micronesia, Federated States Of":"FM",
    "Moldova":"MD",
    "Monaco":"MC",
    "Mongolia":"MN",
    "Montenegro":"ME",
    "Montserrat":"MS",
    "Morocco":"MA",
    "Mozambique":"MZ",
    "Myanmar":"MM",
    "Namibia":"NA",
    "Nauru":"NR",
    "Nepal":"NP",
    "Netherlands":"NL",
    "Netherlands Antilles":"AN",
    "New Caledonia":"NC",
    "New Zealand":"NZ",
    "Nicaragua":"NI",
    "Niger":"NE",
    "Nigeria":"NG",
    "Niue":"NU",
    "Norfolk Island":"NF",
    "Northern Mariana Islands":"MP",
    "Norway":"NO",
    "Oman":"OM",
    "Pakistan":"PK",
    "Palau":"PW",
    "Palestinian Territory, Occupied":"PS",
    "Panama":"PA",
    "Papua New Guinea":"PG",
    "Paraguay":"PY",
    "Peru":"PE",
    "Philippines":"PH",
    "Pitcairn":"PN",
    "Poland":"PL",
    "Portugal":"PT",
    "Puerto Rico":"PR",
    "Qatar":"QA",
    "Reunion":"RE",
    "Romania":"RO",
    "Russian Federation":"RU",
    "Rwanda":"RW",
    "Saint Barthelemy":"BL",
    "Saint Helena":"SH",
    "Saint Kitts And Nevis":"KN",
    "Saint Lucia":"LC",
    "Saint Martin":"MF",
    "Saint Pierre And Miquelon":"PM",
    "Saint Vincent And Grenadines":"VC",
    "Samoa":"WS",
    "San Marino":"SM",
    "Sao Tome And Principe":"ST",
    "Saudi Arabia":"SA",
    "Senegal":"SN",
    "Serbia":"RS",
    "Seychelles":"SC",
    "Sierra Leone":"SL",
    "Singapore":"SG",
    "Slovakia":"SK",
    "Slovenia":"SI",
    "Solomon Islands":"SB",
    "Somalia":"SO",
    "South Africa":"ZA",
    "South Georgia And Sandwich Isl.":"GS",
    "Spain":"ES",
    "Sri Lanka":"LK",
    "Sudan":"SD",
    "Suriname":"SR",
    "Svalbard And Jan Mayen":"SJ",
    "Swaziland":"SZ",
    "Sweden":"SE",
    "Switzerland":"CH",
    "Syrian Arab Republic":"SY",
    "Taiwan":"TW",
    "Tajikistan":"TJ",
    "Tanzania":"TZ",
    "Thailand":"TH",
    "Timor-Leste":"TL",
    "Togo":"TG",
    "Tokelau":"TK",
    "Tonga":"TO",
    "Trinidad And Tobago":"TT",
    "Tunisia":"TN",
    "Turkey":"TR",
    "Turkmenistan":"TM",
    "Turks And Caicos Islands":"TC",
    "Tuvalu":"TV",
    "Uganda":"UG",
    "Ukraine":"UA",
    "United Arab Emirates":"AE",
    "United Kingdom":"GB",
    "United States":"US",
    "United States Outlying Islands":"UM",
    "Uruguay":"UY",
    "Uzbekistan":"UZ",
    "Vanuatu":"VU",
    "Venezuela":"VE",
    "Vietnam":"VN",
    "Virgin Islands, British":"VG",
    "Virgin Islands, U.S.":"VI",
    "Wallis And Futuna":"WF",
    "Western Sahara":"EH",
    "Yemen":"YE",
    "Zambia":"ZM",
    "Zimbabwe":"ZW"
 };
}
