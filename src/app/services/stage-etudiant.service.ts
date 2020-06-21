import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StageEtudiant} from "../models/stage-etudiant.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class StageEtudiantService {
  private _stageEtudiants:Array<StageEtudiant>;
  private _stageEtudiant:StageEtudiant;
  url="http://localhost:8091/gestion-stage-api/stage-etudiant/"
  constructor(private httpClient: HttpClient,private  authentificationService:AuthentificationService) { }
  findByStageReference(ref:string){
    this.httpClient.get<Array<StageEtudiant>>(this.url+"stage/reference/"+ref,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
        this.stageEtudiants = data;
    })
  }


  get stageEtudiants(): Array<StageEtudiant> {
    if(this._stageEtudiants == null){
      this._stageEtudiants = new Array<StageEtudiant>();
    }
    return this._stageEtudiants;
  }

  set stageEtudiants(value: Array<StageEtudiant>) {
    this._stageEtudiants = value;
  }

  get stageEtudiant(): StageEtudiant {
    if(this._stageEtudiant == null){
      this._stageEtudiant = new StageEtudiant();
    }
    return this._stageEtudiant;
  }

  set stageEtudiant(value: StageEtudiant) {
    this._stageEtudiant = value;
  }
}
