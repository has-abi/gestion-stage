import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VilleStatistic} from "../models/statistics/ville-statistic.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private url = "http://localhost:8091/gestion-stage-api/ville/statistics/filier/id/"
  constructor(private http:HttpClient) { }
  private _villeStatistics:Array<VilleStatistic>;
  getData(id:number):Observable<Array<VilleStatistic>>{
      return this.http.get<Array<VilleStatistic>>(this.url+id);
  }

  get villeStatistics(): Array<VilleStatistic> {
    if(this._villeStatistics == null){
      this._villeStatistics = new Array<VilleStatistic>();
    }
    return this._villeStatistics;
  }

  set villeStatistics(value: Array<VilleStatistic>) {
    this._villeStatistics = value;
  }
}
