import { Injectable } from '@angular/core';
import {Tache} from "../models/tache.model";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";
import {Stage} from "../models/stage.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private _tache:Tache;
  private _taches:Array<Tache>;

  get tache(): Tache {
    if(this._tache==null){
      this._tache=new Tache();
    }
    return this._tache;
  }
  set tache(value: Tache) {
    this._tache = value;
  }


  findByStageRef(ref:string):Observable<Array<Tache>>{
    return this.http.get<Array<Tache>>( "http://localhost:8091/gestion-stage-api/tache/stage/reference/"+ref);
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

  url="http://localhost:8091/gestion-stage-api/tache/";

  constructor(private http:HttpClient) { }
  validerTache(tache :Tache){
    this.http.put(this.url+"reference",tache.reference).subscribe(resp=>{
      if(resp>0){
        tache.valider = true;
      }
    })
    return tache;
  }
  findAllTaches(){
    this.http.get<Array<Tache>>(this.url).subscribe(
      data=>{
        this.taches=data;
      }, error=>{
        console.log(error);
    }
    );

  }

}
