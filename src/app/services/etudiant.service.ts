import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";

import {Etudiant} from "../models/etudiant.model";
import {Filiere} from "../models/filiere.model";
import {UserService} from "./user.service";

import {EtudiantPage} from "../models/pageModels/etudiant-page";
import {Observable} from "rxjs";

import {Encadreur} from "../models/encadreur.model";
import {AuthentificationService} from "./auth/authentification.service";

 @Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant:Etudiant;
  private _etudiants:Array<Etudiant>;
  private _fEtudiants:Array<Etudiant>;
  link="http://localhost:8091/gestion-stage-api/etudiant/";
  private _pageEtudiant:EtudiantPage;
  tableElements = [];
  constructor(private http:HttpClient,private userService :UserService,private authentificationService:AuthentificationService) { }
  findByUserId(id:number):Observable<Etudiant>{
    return this.http.get<Etudiant>(this.link+"user/id/"+id,{headers:this.authentificationService.getHeaders()});
  }
  sendCode(cne:string,username:string){
    this.http.get("http://localhost:8091/gestion-stage-api/mail/username/"+username+"/cne/"+cne).subscribe(resp=>{
	});
  }
  confirmEtudiant(cne:string,codeAppoge:string):Observable<number>{
    return this.http.get<number>(this.link+"confirm/cne/"+cne+"/codeAppoge/"+codeAppoge);
  }
  createEtudiant(etudiant:Etudiant):Observable<number>{
    return this.http.post<number>(this.link,etudiant,{headers:this.authentificationService.getHeaders()});
  }
  findByFiliere(id:number){
    this.http.get<Array<Etudiant>>(this.link+"filiere/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(etuds=>{
      this.fEtudiants = etuds;
    })
  }

  findByEncadreur(id:number){
    this.http.get<Array<Etudiant>>(this.link+"encadreur/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(etuds=>{
      this.pageEtudiant.content = etuds;
    })
  }

   findByJury(id:number){
     this.http.get<Array<Etudiant>>(this.link+"jury/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(etuds=>{
       this.etudiants = etuds;
     })
   }

  findByCoordinateur(id:number,page:number,size:number,sort:string){
    return this.http.get<EtudiantPage>(this.link+"coordinateur/id/"+id+"/page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this._pageEtudiant = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findByCodeAppoge(codeAppoge:string){
    this.http.get<Etudiant>(this.link+"codeAppoge/"+codeAppoge,{headers:this.authentificationService.getHeaders()}).subscribe(data=>this.etudiant = data);
  }

    findAll(page:number,size:number,sort:string){
    this.http.get<EtudiantPage>(this.link+"page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this._pageEtudiant = datas;
      this.fillTableElements(datas.totalPages);
    });
  }
  removeByCne(cne:string):Observable<number>{
    return this.http.delete<number>(this.link+"cin/"+cne,{headers:this.authentificationService.getHeaders()});
  }
  save():Observable<number>{
    return this.http.post<number>(this.link,this.etudiant,{headers:this.authentificationService.getHeaders()});
  }
  update(etudiant:Etudiant):Observable<number>{
    return this.http.put<number>(this.link,etudiant,{headers:this.authentificationService.getHeaders()});
  }
  search(seach:string){
    const request = "search?search=user.nom:*"+seach+"* OR user.prenom:*"+seach+"* OR user.username:*"+seach+"* OR " +
      "cin:*"+seach+"* OR user.sexe:*"+seach+"* OR user.adress:*"+seach+"* OR codeAppoge:*"+seach+"* OR niveau:*"+seach+"*";
    this.http.get<Array<Etudiant>>(this.link+request,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.etudiants = datas;

    })
  }

  searchByCoord(seach:string,id:number){
    const request = "search?search=user.nom:*"+seach+"* OR user.prenom:*"+seach+"* OR user.username:*"+seach+"* OR " +
      "cin:*"+seach+"* OR user.sexe:*"+seach+"* OR user.adress:*"+seach+"* OR codeAppoge:*"+seach+"* OR niveau:*"+seach+"*";
    this.http.get<Array<Etudiant>>(this.link+"coordinateur/id/"+id+"/"+request,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.etudiants = datas;
    })
  }

  searchByEncad(seach:string,id:number){
    const request = "search?search=user.nom:*"+seach+"* OR user.prenom:*"+seach+"* OR user.username:*"+seach+"* OR " +
      "cin:*"+seach+"* OR user.sexe:*"+seach+"* OR user.adress:*"+seach+"* OR codeAppoge:*"+seach+"* OR niveau:*"+seach+"*";
    this.http.get<Array<Etudiant>>(this.link+"encadreur/id/"+id+"/"+request,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.etudiants = datas;
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }

  findAllEtudiants(){
    return this.http.get<Array<Etudiant>>(this.link,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.etudiants = data;
    })
  }
  findByCin(cin:string){
     this.http.get<Etudiant>(this.link+"cin/"+cin,{headers:this.authentificationService.getHeaders()}).subscribe(etudiant=>{
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
    if(this._pageEtudiant==null){
      this._pageEtudiant=new EtudiantPage();
    }
      return this._pageEtudiant;
    }


   get fEtudiants(): Array<Etudiant> {
      if(this._fEtudiants == null){
        this._fEtudiants == new Array<Etudiant>();
      }
       return this._fEtudiants;
   }

   set fEtudiants(value: Array<Etudiant>) {
     this._fEtudiants = value;
   }

   set pageEtudiant(value: EtudiantPage) {
    this._pageEtudiant = value;
  }
  findByNiveau(niveau:string,page:number,size:number){
    this.http.get<EtudiantPage>(this.link+"niveau/"+niveau+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>this.pageEtudiant = data);
  }
  findByNomOrPrenom(find:string,page:number,size:number){
    this.http.get<EtudiantPage>(this.link+"user/nom/"+find+"/prenom/"+find+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.pageEtudiant = data;
    })
  }


}

