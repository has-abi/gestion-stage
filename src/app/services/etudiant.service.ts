import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Etudiant} from "../models/etudiant.model";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private httpClient:HttpClient) { }
  private _etudiant:Etudiant;
  private _etudiants:Array<Etudiant>;

  get etudiants(): Array<Etudiant> {
    return this._etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }

  get etudiant(): Etudiant {
    return this._etudiant;
  }

  set etudiant(value: Etudiant) {
    this._etudiant = value;
  }
  public findByCin(){


  }
}
