import { Injectable } from '@angular/core';
import {Encadreur} from "../models/encadreur.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {StageEncadreur} from "../models/stage-encadreur.model";
import {EncadreurPage} from "../models/pageModels/encadreur-page";
import {Observable} from "rxjs";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class EncadreurService {
  private _encadreur:Encadreur;
  private _encadreurs:Array<Encadreur>;
  private _fEncadreurs:Array<Encadreur>;
  private _pageEncadreurs:EncadreurPage;
  tableElements = [];
  url="http://localhost:8091/gestion-stage-api/encadreur"

  constructor(private http: HttpClient,private authentificationService:AuthentificationService) { }

  findByFiliere(id:number){
    this.http.get<Array<Encadreur>>(this.url+"/filiere/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(encads=>{
      this.fEncadreurs = encads;
    })
  }
  createEncadreur(encadreur:Encadreur):Observable<number>{
    return this.http.post<number>(this.url+"/",encadreur,{headers:this.authentificationService.getHeaders()});
  }
  findByUserId(id:number):Observable<Encadreur>{
    return this.http.get<Encadreur>(this.url+"/user/id/"+id,{headers:this.authentificationService.getHeaders()});
  }
  update(encadreur:Encadreur):Observable<number>{
    return this.http.put<number>(this.url+"/",encadreur,{headers:this.authentificationService.getHeaders()});
  }
  delete(reference:string):Observable<number>{
    return this.http.delete<number>(this.url+"/reference/"+reference,{headers:this.authentificationService.getHeaders()});
  }
  findByCoordinateur(id:number,page:number,size:number,sort:string){
    this.http.get<EncadreurPage>(this.url+"/coordinateur/id/"+id+"/page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.pageEncadreurs = datas;
      this.fillTableElements(datas.totalPages);
    })
  }
  search(seach:string){
    const request = "/search?search=user.nom:*"+seach+"* OR user.prenom:*"+seach+"* OR user.email:*+"+seach+"* " +
      "OR type:*"+seach+"* OR user.sexe:*"+seach+"* OR user.adress:*"+seach+"* OR qualite:*"+seach+"* OR profession:*"+seach+"*";
    this.http.get<Array<Encadreur>>(this.url+request,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      console.log(datas);
      this.encadreurs = datas;
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
  get pageEncadreurs(): EncadreurPage {
    if(this._pageEncadreurs == null){
      this._pageEncadreurs = new EncadreurPage();
    }
    return this._pageEncadreurs;
  }

  set pageEncadreurs(value: EncadreurPage) {
    this._pageEncadreurs = value;
  }

  get encadreur(): Encadreur {
    if(this._encadreur == null){
      this._encadreur = new Encadreur();
      this._encadreur.user = new User();
      this._encadreur.type="faculte";
    }
    return this._encadreur;
  }

  set encadreur(encadreur: Encadreur) {
    encadreur.user = new User();
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


  get fEncadreurs(): Array<Encadreur> {
  if(this._fEncadreurs == null){
    this._fEncadreurs ==  new Array<Encadreur>();
  }
    return this._fEncadreurs;
  }

  set fEncadreurs(value: Array<Encadreur>) {
    this._fEncadreurs = value;
  }

  cloneEncadreur(encadreur:Encadreur){
    const  e = new Encadreur();
    e.id = encadreur.id;
    e.profession = encadreur.profession;
    e.reference = encadreur.reference;
    e.remarque = encadreur.remarque;
    e.qualite = encadreur.qualite;
    e.type = encadreur.type;
    return e;
  }
}
