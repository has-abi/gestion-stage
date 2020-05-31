import { Injectable } from '@angular/core';
import {Stage} from "../models/stage.model";

import {HttpClient} from "@angular/common/http";
import {StagePage} from "../models/pageModels/stage-page.model";

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private _stage:Stage;
  private _searchedStage:Stage;
  private _stages:Array<Stage>;
  private _stagePage:StagePage;
  tableElements = [];
  private _selectedStages:Array<Stage>;
  stageMessage = {
    "type":'',
    "message":''
  }
  url="http://localhost:8091/gestion-stage-api/stage/"
  constructor(private httpClient:HttpClient) { }
  save(){
    this.stage.reference = this.getReference();
    this.httpClient.post(this.url,this.stage).subscribe(resp=>{
      console.log(resp)
    })
  }
  update(){

        this.httpClient.put(this.url,this.stage).subscribe(resp=>{
          console.log(resp);
          if(resp>0){

            this.stageMessage.type="success";
            this.stageMessage.message="stage modifier avec succée!"
          }else{
            this.stageMessage.type="error";
            this.stageMessage.message="on ne peut pas modifier le stage!"
          }
        })


    console.log(this.stageMessage);
  }
  findAllPages(page:number,size:number){
      return this.httpClient.get<StagePage>(this.url+"list/get?page="+page+"&size="+size).subscribe(data=>{
        this.stagePage = data
        console.log(data.content)
        this.fillTableElements(data.totalPages);
      })
  }
  findByDateDebut(dateDebut:string,page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"dateDebut/"+dateDebut+"/page/"+page+"/size/"+size).subscribe(data=>{
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
    this.httpClient.get<StagePage>(this.url+"dateFin/"+dateFin+"/page/"+page+"/size/"+size).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findByOrganisme(page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"organismeAccueil/"+this.searchedStage.organismeAccueil.raisonSociale+"/page/"+page+"/size/"+size).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  findBysujet(page:number,size:number){
    this.httpClient.get<StagePage>(this.url+"sujet/"+this.searchedStage.sujet+"/page/"+page+"/size/"+size).subscribe(data=>{
      this.stagePage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  getAllStages(){
    return this.httpClient.get<Array<Stage>>(this.url+"dateFin/"+this.searchedStage.dateFin).subscribe(data=>{
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

}
