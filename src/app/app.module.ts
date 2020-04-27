import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CovidListComponent } from './components/covid-list/covid-list.component';
import { HttpClientModule } from "@angular/common/http";
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CovidListComponent,
    StatisticsComponent,
    PieChartComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
