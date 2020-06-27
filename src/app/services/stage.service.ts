import { Injectable } from '@angular/core';
import {Stage} from "../models/stage.model";

import {HttpClient} from "@angular/common/http";
import {StagePage} from "../models/pageModels/stage-page.model";
import {Coordinateur} from "../models/coordinateur.model";
import {Observable} from "rxjs";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private _stage:Stage;
  private _searchedStage:Stage;
  private _stages:Array<Stage>;
  private _stagePage:StagePage;
  tableElements = [];
  nombreStages = 0;
  private _selectedStages:Array<Stage>;
  stageMessage = {
    "type":'',
    "message":''
  }
  url="http://localhost:8091/gestion-stage-api/stage/"
  constructor(private httpClient:HttpClient,private authentificationService:AuthentificationService) { }

  findEtudinantActiveStages(id:number){
    this.httpClient.get<Stage>(this.url+"etudiant/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(stage=>{
      this.stage = stage;
    })
  }

  findCoordinateurActiveStages(id:number){
    this.httpClient.get<Array<Stage>>(this.url+"coordinateur/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(stages=>{
      this.stages = stages;
    })
  }

  findEncadreurActiveStages(id:number){
    this.httpClient.get<Array<Stage>>(this.url+"encadreur/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(stages=>{
      this.stages = stages;
    })
  }

  findJuryActiveStages(id:number){
    this.httpClient.get<Array<Stage>>(this.url+"jury/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(stages=>{
      this.stages = stages;
    })
  }

  findByCoordinateurId(id:number,page:number,size:number,sort:string){
    this.httpClient.get<StagePage>(this.url+"coordinateur/id/"+id+"/page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  countStages():Observable<number>{
    return this.httpClient.get<number>(this.url+"count",{headers:this.authentificationService.getHeaders()});
  }
  findByEtudiantId(id:number,page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"etudiant/id/"+id+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findByJuryId(id:number,page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"jury/id/"+id+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=> {
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findByEncadreurId(id:number,page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"encadreur/id/"+id+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findById(id:number):Observable<Stage>{
    return  this.httpClient.get<Stage>(this.url + "id/" + id,{headers:this.authentificationService.getHeaders()});
  }

  save(stage:Stage):Observable<number>{
    stage.reference = this.getReference();
    return this.httpClient.post<number>(this.url,stage,{headers:this.authentificationService.getHeaders()});
  }

  update(stage:Stage):Observable<number>{
    console.log("service update")
    console.log(this.stage);
    console.log(this.authentificationService.getHeaders());
       return  this.httpClient.put<number>(this.url,stage,{headers:this.authentificationService.getHeaders()});
  }
  deleteByReference(reference:string):Observable<number>{
    return this.httpClient.delete<number>(this.url+"reference/"+reference,{headers:this.authentificationService.getHeaders()});
  }

  findAllPages(page:number,size:number){
      return this.httpClient.get<StagePage>(this.url+"list/get?page="+page+"&size="+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
        this.stagePage = data
        console.log(data.content)
        this.fillTableElements(data.totalPages);
      })
  }
  findByDateDebut(dateDebut:string,page:number,size:number,){
    this.httpClient.get<StagePage>(this.url+"dateDebut/"+dateDebut+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data
     this.fillTableElements(data.totalPages);
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
  findByDateFin(dateFin:string,page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"dateFin/"+dateFin+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findByOrganisme(page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"organismeAccueil/"+this.searchedStage.organismeAccueil.raisonSociale+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findBysujet(page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"sujet/"+this.searchedStage.sujet+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  getAllStages(){
    return this.httpClient.get<Array<Stage>>(this.url+"dateFin/"+this.searchedStage.dateFin,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
          this.stages = data;
    })
  }
  get stage(): Stage {
    if(this._stage == null){
      this._stage = new Stage();
    }
      return this._stage;
  }

  set stage(value: Stage) {
    this._stage = value;
  }


  get stages(): Array<Stage> {
    if(this._stages ==  null){
      this._stages = new Array<Stage>();
    }
    return this._stages;
  }

  set stages(value: Array<Stage>) {
    this._stages = value;
  }

  getReference(){
    const date = new Date();
    return "stage"+date.getTime();
  }

  get stagePage(): StagePage {
    if(this._stagePage ==  null){
      this._stagePage = new StagePage();
    }
    return this._stagePage;
  }

  set stagePage(value: StagePage) {
    this._stagePage = value;
  }


  get searchedStage(): Stage {
    if(this._searchedStage == null){
      this._searchedStage = new Stage();
    }
    return this._searchedStage;
  }

  set searchedStage(value: Stage) {
    this._searchedStage = value;
  }

  get selectedStages(): Array<Stage> {
    if(this._selectedStages == null){
      this._selectedStages = new Array<Stage>();
    }
    return this._selectedStages;
  }

  set selectedStages(value: Array<Stage>) {
    this._selectedStages = value;
  }
  validerLesChamps(){
    return (this.stage.organismeAccueil.raisonSociale.length == 0  || this.stage.organismeAccueil.email.length == 0 || this.stage.organismeAccueil.adress.length == 0 ||
      this.stage.organismeAccueil.responsable.length == 0 || this.stage.organismeAccueil.tele.length == 0 || this.stage.organismeAccueil.teleFix.length == 0
      || this.stage.organismeAccueil.typeOrganisme.type == "--SELECT--" || this.stage.organismeAccueil.typeServiceOrganisme.type == "--SELECT--" || this.stage.organismeAccueil.ville.nom == "--SELECT--")

  }
  activerStage(ref:string):Observable<number>{
    return  this.httpClient.put<number>(this.url+"activate",ref);
  }
  countByCoordinateurReference(ref:string){
      this.httpClient.get<number>(this.url+"coordinateur/count/ref/"+ref).subscribe(n=>this.nombreStages = n);
  }
  countByEncadreurId(id:number){
    this.httpClient.get<number>(this.url+"encadreur/count/id/"+id).subscribe(n=>this.nombreStages = n);
  }
  countByEtudiantId(id:number){
    this.httpClient.get<number>(this.url+"etudiant/count/id/"+id).subscribe(n=>this.nombreStages = n);
  }
  countByJuryId(id:number){
    this.httpClient.get<number>(this.url+"jury/count/id/"+id).subscribe(n=>this.nombreStages = n);
  }
  findByReference(ref:string){
    this.httpClient.get<Stage>(this.url+"reference/"+ref).subscribe(data=>this.stage= data);
  }



}
