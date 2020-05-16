import { Injectable } from '@angular/core';
import {Encadreur} from "../models/encadreur.model";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../models/utilisateur.model";
import {StageEncadreur} from "../models/stage-encadreur.model";

@Injectable({
  providedIn: 'root'
})
export class EncadreurService {
  private _encadreur:Encadreur;
  private _encadreurs:Array<Encadreur>;
  url="localhost:8091/gestion-stage-api/encadreur"
  constructor(private http: HttpClient) { }

  get encadreur(): Encadreur {
    if(this._encadreur == null){
      this._encadreur = new Encadreur();
      this._encadreur.utilisateur = new Utilisateur();
    }
    return this._encadreur;
  }

  set encadreur(encadreur: Encadreur) {
    encadreur.utilisateur = new Utilisateur();
    this._encadreur = encadreur;
  }

  get encadreurs(): Array<Encadreur> {
    if(this._encadreurs == null){
      this._encadreurs = new Array<Encadreur>();
    }
    return this._encadreurs;
  }

  set encadreurs(value: Array<Encadreur>) {
    this._encadreurs = value;
  }
  cloneEncadreur(encadreur:Encadreur){
    const  e = new Encadreur();
    e.id = encadreur.id;
    e.profession = encadreur.profession;
    e.reference = encadreur.reference;
    e.remarque = encadreur.remarque;
    e.stageEncadreurs = new Array<StageEncadreur>();
    e.utilisateur = new Utilisateur();
    e.qualite = encadreur.qualite;
    e.type = encadreur.type;
    return e;
  }
}
