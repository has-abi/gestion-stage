import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {StageEtudiantService} from "../../../services/stage-etudiant.service";

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.css']
})
export class ListStagesComponent implements OnInit {
  page:number = 0;
  size:number = 10;
  searchCretaria = true;
  searchRoles = true;
  searching = false;
  search = "-SELECT-";
  roles= "-SELECT-";
  searchStage = "";
  modifyEtudiant = false;
  searchByDate = false;
  columns = {
    'id':false,
    'sujet':true,
    'dateDebut':true,
    'dateFin':true,
    'status':true,
    'etudiants':true,
    'encadreurs':true,
    'organisme':true,
    'actions':true,
    'juries':false,
    'rapport':false
  }

  constructor(private stageService: StageService,private stageEtudiantService:StageEtudiantService) { }

  ngOnInit(): void {
    this.findAllPages();

  }
  findAll(){
    return this.stageService.getAllStages();
  }
  get stage(){
    return this.stageService.stage;
  }
  get stages(){
    return this.stageService.stages;
  }
  get stagePage(){
    return this.stageService.stagePage;
  }
  findAllPages(){
    return this.stageService.findAllPages(this.page,this.size);
  }
  nextElements(){
    if(this.page<=this.stagePage.totalPages){
      this.page++;
      this.findAllPages();
      this.stageService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findAllPages();
      this.stageService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.stagePage.totalPages){
      this.page = i;
      this.findAllPages();
      this.stageService.tableElements = [];
    }
  }
  get tableElements(){
    return this.stageService.tableElements;
  }
  resizePage(){
    this.findAllPages();
    this.stageService.tableElements = [];
  }
  get searchedStage(){
    return this.stageService.searchedStage;
  }
  chercher(){
    if(this.searchStage.length == 0){
      this.findAllPages();
      this.stageService.tableElements = [];
    }
      else if(this.search == "1"){
        this.searchedStage.sujet = this.searchStage;
        this.stageService.findBysujet(this.page,this.size);
      }else if(this.search == "2"){
        if(this.checkDate(this.searchStage)){
          this.stageService.findByDateDebut(this.searchStage,this.page,this.size);
        }

    }
  }
  get stageEtudiants(){
    return this.stageEtudiantService.stageEtudiants;
  }
  findStageEtudiants(ref:string){
    return this.stageEtudiantService.findByStageReference(ref);
  }
  checkDate(date:string){
      const rgx = new RegExp("\\d{4}-\\d{2}-\\d{2}")
      return rgx.test(date)?true:false;
  }
}
