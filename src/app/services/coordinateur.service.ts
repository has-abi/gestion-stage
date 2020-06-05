import { Injectable } from '@angular/core';
import {Coordinateur} from "../models/coordinateur.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoordinateurService {
  url="http://localhost:8091/gestion-stage-api/coordinateur/";
  private _coordinateur:Coordinateur;
  private _coordinatuers:Array<Coordinateur>;
  constructor(private httpClient:HttpClient) { }
  getCoordinateur(){
    this.httpClient.get<Coordinateur>(this.url+"reference/cord7485").subscribe(c=>{
      this.coordinateur = c;
    })
  }

  get coordinateur(): Coordinateur {
    if(this._coordinateur == null){
      this._coordinateur = new Coordinateur();
    }
    return this._coordinateur;
  }

  set coordinateur(value: Coordinateur) {
    this._coordinateur = value;
  }

  get coordinatuers(): Array<Coordinateur> {
    if(this._coordinatuers == null){
      this._coordinatuers = new Array<Coordinateur>();
    }
    return this._coordinatuers;
  }

  set coordinatuers(value: Array<Coordinateur>) {
    this._coordinatuers = value;
  }
}
