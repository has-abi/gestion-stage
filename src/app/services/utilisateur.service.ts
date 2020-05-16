import { Injectable } from '@angular/core';
import {Utilisateur} from "../models/utilisateur.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private _utilisateur:Utilisateur;
  private _utilisateurs:Array<Utilisateur>;
  url="http://localhost:8091/gestion-stage-api/utilisateur"
  constructor(private httpClient: HttpClient) { }
  findAll(){
    this.httpClient.get<Array<Utilisateur>>(this.url+"/").subscribe(u=>{
      this.utilisateurs = u;
    })
  }
  get utilisateur(): Utilisateur {
    if(this._utilisateur == null){
      this._utilisateur = new Utilisateur();
    }
    return this._utilisateur;
  }

  set utilisateur(value: Utilisateur) {
    this._utilisateur = value;
  }

  get utilisateurs(): Array<Utilisateur> {
    if(this.utilisateurs == null){
      this._utilisateurs = new Array<Utilisateur>();
    }
    return this._utilisateurs;
  }

  set utilisateurs(value: Array<Utilisateur>) {
    this._utilisateurs = value;
  }
}
