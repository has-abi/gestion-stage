import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stage} from "../models/stage.model";
import {Etudiant} from "../models/etudiant.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _searchResults = [];
  url="http://localhost:8091/gestion-stage-api/"
  constructor(private httpClient:HttpClient,private authentificationService:AuthentificationService) { }
  CoordinateurSearch(search:string,id:number){
    const request = "stage/search?search=sujet:*"+search+"* OR organismeAccueil.raisonScial:*"+search+"* AND coordinateur.id:"+id;
    this.httpClient.get<Array<Stage>>(this.url+request,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      datas.forEach(stage=>this._searchResults.push(stage));
    })
  }

  get searchResults(): any[] {
    return this._searchResults;
  }

  set searchResults(value: any[]) {
    this._searchResults = value;
  }
}
