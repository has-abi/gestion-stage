import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../models/filiere.model";
import {Role} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private _filieres:Array<Filiere>;
  private roles:Array<Role>;
  constructor(private http:HttpClient) { }

  getAllFilieres(){
    this.http.get<Array<Filiere>>("http://localhost:8091/gestion-stage-api/filiere/").subscribe(datas=>{
      this.filieres = datas;
    })
  }

  getRoles(){
    this.http.get<Array<Role>>("")
  }

  get filieres(): Array<Filiere> {
    if(this._filieres == null){
      this._filieres = new Array<Filiere>();
    }
    return this._filieres;
  }

  set filieres(value: Array<Filiere>) {
    this._filieres = value;
  }
}
