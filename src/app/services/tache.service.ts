import { Injectable } from '@angular/core';
import {Tache} from "../models/tache.model";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";
import {Stage} from "../models/stage.model";
import {Observable} from "rxjs";
import {TachePage} from "../models/pageModels/tache-page.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private _tache:Tache;
  private _taches:Array<Tache>;
  private _tachePage:TachePage;
  private url="http://localhost:8091/gestion-stage-api/tache/";
  tacheElements = [];
  constructor(private http:HttpClient,private authentificationService:AuthentificationService) { }
  findAllTaches(){
    this.http.get<Array<Tache>>(this.url,{headers:this.authentificationService.getHeaders()}).subscribe(
      data=>{
        this.taches=data;
      }, error=>{
        console.log(error);
    }
    );
  }

  findByEncadeur(id:number,page:number,size:number){
    this.http.get<TachePage>(this.url+"encadreur/id/"+id+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
        this.tachePage = datas
      this.fillTableElements(datas.totalPages);
    })
  }
  findByEtudiant(id:number,page:number,size:number){
    this.http.get<TachePage>(this.url+"etudiant/id/"+id+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.tachePage = datas
      this.fillTableElements(datas.totalPages);
    })
  }
  search(search:string):Observable<Array<Tache>>{
    const request = "search?search=titre:*"+search+"* OR contenu:*"+search+"*";
    return this.http.get<Array<Tache>>(this.url+request,{headers:this.authentificationService.getHeaders()});
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tacheElements.push(i);
    }
  }

  get tachePage(): TachePage {
  if(this._tachePage == null){
    this._tachePage = new TachePage();
  }
    return this._tachePage;
  }

  set tachePage(value: TachePage) {
    this._tachePage = value;
  }

  get tache(): Tache {
    if(this._tache==null){
      this._tache=new Tache();
    }
    return this._tache;
  }
  set tache(value: Tache) {
    this._tache = value;
  }
  create(tache:Tache):Observable<number>{
    return this.http.post<number>(this.url,tache,{headers:this.authentificationService.getHeaders()});
  }

  update(tache:Tache):Observable<number>{
    return this.http.put<number>(this.url,tache,{headers:this.authentificationService.getHeaders()});
  }

  deleteByReference(ref:string):Observable<number>{
    return  this.http.delete<number>(this.url+"delete/reference/"+ref,{headers:this.authentificationService.getHeaders()});
  }


  findByStageRef(ref:string):Observable<Array<Tache>>{
    return this.http.get<Array<Tache>>( this.url+"stage/reference/"+ref,{headers:this.authentificationService.getHeaders()});
  }

  validerTache(ref:string):Observable<number>{
    return this.http.put<number>(this.url+"valider/reference/"+ref,null,{headers:this.authentificationService.getHeaders()});
  }
  
  effectuerTache(ref:string):Observable<number>{
    return this.http.put<number>(this.url+"effectuer/reference/"+ref,null,{headers:this.authentificationService.getHeaders()});
  }

  get taches(): Array<Tache> {
    if(this._taches==null){
      this._taches=new Array<Tache>();
    }
    return this._taches;
  }

  set taches(value: Array<Tache>) {
    this._taches = value;
  }


}
