import { Injectable } from '@angular/core';
import {Etudiant} from "../models/etudiant.model";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../models/utilisateur.model";
import {Filiere} from "../models/filiere.model";
import {EtudiantDocument} from "../models/etudiant-document.model";
import {StageEtudiant} from "../models/stage-etudiant.model";
import {UtilisateurService} from "./utilisateur.service";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant:Etudiant;
  private _etudiants:Array<Etudiant>;
  link="http://localhost:8093/gestion-stage-api/etudiant/"
  constructor(private http:HttpClient,private utilisateurService :UtilisateurService) { }
  findAllEtudiants(){
    return this.http.get<Array<Etudiant>>(this.link).subscribe(data=>{
      this.etudiants = data;
    })
  }
  findByCin(cin:string){
     this.http.get<Etudiant>(this.link+"cin/"+cin).subscribe(etudiant=>{
       if(etudiant != null) {
         this.etudiant= etudiant
       }
    })
  }
  get etudiant(): Etudiant {
    if(this._etudiant == null){
      this._etudiant = new Etudiant();
    }

    return this._etudiant;
  }

  set etudiant(etudiant: Etudiant) {
    this._etudiant = etudiant;
  }

  get etudiants(): Array<Etudiant> {
    if(this._etudiants == null){
      this._etudiants = new Array<Etudiant>();
    }
    return this._etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }
  cloneEtudiant(etudiant:Etudiant){
    const e = new Etudiant();
    e.cin = etudiant.cin;
    e.codeAppoge = etudiant.codeAppoge;
    e.filiere = new Filiere();
    return e;
  }


}