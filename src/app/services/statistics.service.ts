import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VilleStatistic} from "../models/statistics/ville-statistic.model";
import {Observable} from "rxjs";
import {OrganismeStatistic} from "../models/statistics/organisme-statistic.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private _villeStatistics:Array<VilleStatistic>;
  private _organismeStatistics:Array<OrganismeStatistic>;
  private url = "http://localhost:8091/gestion-stage-api/ville/statistics/filier/id/"
  constructor(private http:HttpClient,private authentificationService:AuthentificationService) { }

  getData(id:number):Observable<Array<VilleStatistic>>{
      return this.http.get<Array<VilleStatistic>>(this.url+id,{headers:this.authentificationService.getHeaders()});
  }
  getOrganismeData(id:number):Observable<Array<OrganismeStatistic>>{
    return this.http.get<Array<OrganismeStatistic>>("http://localhost:8091/gestion-stage-api/organismeAccueil/statistics/filiere/id/"+id,{headers:this.authentificationService.getHeaders()});
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


  get organismeStatistics(): Array<OrganismeStatistic> {
    if(this._organismeStatistics == null){
      this._organismeStatistics = new Array<OrganismeStatistic>();
    }
    return this._organismeStatistics;
  }

  set organismeStatistics(value: Array<OrganismeStatistic>) {
    this._organismeStatistics = value;
  }
}
