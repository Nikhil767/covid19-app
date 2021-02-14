import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountriesMapModule } from 'countries-map';

import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InterceptorService } from './interceptor/interceptor.service';
import { BackendapiService } from './services/backendapi.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    StatisticsComponent,
    CountriesComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxSelectModule,
    CommonModule,
    FormsModule,
    CountriesMapModule,
    ChartsModule,
    FontAwesomeModule,
    GoogleChartsModule.forRoot({mapsApiKey:'AIzaSyAjYI1suT8CEQQEg-dan-6BTOpxfO6MBYE'})
  ],//AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw
  providers: [
    BackendapiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
