import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";

import {Etudiant} from "../models/etudiant.model";
import {Filiere} from "../models/filiere.model";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {Stage} from "../models/stage.model";
import {Encadreur} from "../models/encadreur.model";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant:Etudiant;
  private _etudiants:Array<Etudiant>;
  private _stage:Stage;
  private _encadrant:Encadreur;

  get encadrant(): Encadreur {
    if(this._encadrant==null){
      return this._encadrant=new Encadreur();
    }
    return this._encadrant;
  }

  set encadrant(value: Encadreur) {
    this._encadrant = value;
  }

  get stage(): Stage {
    if(this._stage==null){
      this._stage=new Stage();
    }
    return this._stage;
  }

  set stage(value: Stage) {
    this._stage = value;
  }

  url1="http://localhost:8091/stage/document/"

  link="http://localhost:8091/gestion-stage-api/etudiant/";
  constructor(private http:HttpClient,private userService :UserService) { }

  findAllEtudiants(){
    return this.http.get<Array<Etudiant>>(this.link).subscribe(data=>{
      this.etudiants = data;
    })
  }
  findByCin(cin:string){
     this.http.get<Etudiant>(this.link+"cin/"+cin).subscribe(etudiant=>{
       if(etudiant != null) {
         this.etudiant= etudiant;
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
  upload(file: File,titre:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('titre', titre);
    const req = new HttpRequest('POST', this.url1, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(this.url1);
  }
}

