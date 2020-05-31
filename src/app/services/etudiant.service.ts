import { Injectable } from '@angular/core';
import {Etudiant} from "../models/etudiant.model";
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../models/filiere.model";
import {UserService} from "./user.service";
import {EtudiantPage} from "../models/pageModels/etudiant-page";
import {Encadreur} from "../models/encadreur.model";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant:Etudiant;
  private _etudiants:Array<Etudiant>;
  private _pageEtudiant:EtudiantPage;
  tableElements = [];
  link="http://localhost:8091/gestion-stage-api/etudiant/"
  constructor(private http:HttpClient,private userService :UserService) { }
  findByCoordinateur(id:number,page:number,size:number){
    return this.http.get<EtudiantPage>(this.link+"coordinateur/id/"+id+"/page/"+page+"/size/"+size).subscribe(data=>{
      this._pageEtudiant = data;
      this.fillTableElements(data.totalPages);
    })
  }
  search(seach:string){
    const request = "search?search=user.nom:*"+seach+"* OR user.prenom:*"+seach+"* OR user.email:*"+seach+"* OR " +
      "cin:*"+seach+"* OR user.sexe:*"+seach+"* OR user.adress:*"+seach+"* OR codeAppoge:*"+seach+"* OR niveau:*"+seach+"*";
    this.http.get<Array<Etudiant>>(this.link+request).subscribe(datas=>{
      this.etudiants = datas;

    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
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


  get pageEtudiant(): EtudiantPage {
    if(this._pageEtudiant == null){
      this._pageEtudiant = new EtudiantPage();
    }
    return this._pageEtudiant;
  }

  set pageEtudiant(value: EtudiantPage) {
    this._pageEtudiant = value;
  }
}
