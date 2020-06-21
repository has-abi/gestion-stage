import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MembreJury} from "../models/membre-jury.model";
import {User} from "../models/user.model";
import {JuryPage} from "../models/pageModels/jury-page";
import {Observable} from "rxjs";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class JuryService {
  private url ="http://localhost:8091/gestion-stage-api/jury/";
  private _jury:MembreJury;
  private _juries:Array<MembreJury>;
  private _pagejury:JuryPage;
  tableElements = [];
  constructor(private http: HttpClient,private  authentificationService:AuthentificationService) { }
findByfiliere(id:number){
    this.http.get<Array<MembreJury>>(this.url+"filiere/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.juries = datas;
    })
}
  createJury(jury:MembreJury):Observable<number>{
    return this.http.post<number>(this.url,jury,{headers:this.authentificationService.getHeaders()});
  }
  findByUserId(id:number):Observable<MembreJury>{
    return this.http.get<MembreJury>(this.url+"user/id/"+id,{headers:this.authentificationService.getHeaders()});
  }
  update(jury:MembreJury):Observable<number>{
    return this.http.put<number>(this.url,jury,{headers:this.authentificationService.getHeaders()});
  }
  delete(reference:string):Observable<number>{
    return this.http.delete<number>(this.url+"reference/"+reference,{headers:this.authentificationService.getHeaders()});
  }
  findByCoordinateur(id:number,page:number,size:number,sort:string){
    this.http.get<JuryPage>(this.url+"coordinateur/id/"+id+"/page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.pagejury = datas;
      this.pagejury.content = datas.content;
    })
  }
  search(seach:string){
    const request = "search?search=user.nom:*"+seach+"* OR user.prenom:*"+seach+"* OR user.email:*+"+seach+"* " +
      "OR role:*"+seach+"* OR user.sexe:*"+seach+"* OR user.adress:*"+seach+"* OR profession:*"+seach+"*";
    this.http.get<Array<MembreJury>>(this.url+request,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      console.log(datas);
      this.juries = datas;
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
  get jury(): MembreJury {
    if(this._jury == null){
      this._jury = new MembreJury();
    }
    return this._jury;
  }

  set jury(value: MembreJury) {
    this._jury = value;
  }

  get juries(): Array<MembreJury> {
    if(this._juries == null){
      this._juries = new Array<MembreJury>();
    }
    return this._juries;
  }

  set juries(value: Array<MembreJury>) {
    this._juries = value;
  }
  cloneJury(jury:MembreJury){
    const j = new MembreJury();
    j.reference = jury.reference;
    j.user = new User();
    j.profession = jury.profession;
    return j;
  }

  get pagejury(): JuryPage {
    if(this._pagejury ==  null){
      this._pagejury = new JuryPage();
    }
    return this._pagejury;
  }

  set pagejury(value: JuryPage) {
    this._pagejury = value;
  }
}
