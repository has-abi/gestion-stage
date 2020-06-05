import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {StageEtudiantService} from "../../../services/stage-etudiant.service";
import {Stage} from "../../../models/stage.model";
import {RapportService} from "../../../services/rapport.service";
import {Rapport} from "../../../models/rapport.model";
import {OrganismeService} from "../../../services/organisme.service";
import {OrganismeAccueil} from "../../../models/organisme-accueil.model";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.css']
})
export class ListStagesComponent implements OnInit {
  page:number = 0;
  size:number = 10;
  searching = false;
  search = "-SELECT-";
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
  selectAll = false;
  tableOrder = {
    order:"asc",
    prop:"id"
  }
  showEtudiant = {
    id:0,
    show:false
  }
  showEncadrant = {
    id:0,
    show:false
  }
  showjury = {
    id:0,
    show:false
  }
  constructor(private stageService: StageService,private stageEtudiantService:StageEtudiantService,
              private rapportService:RapportService,private organismeService:OrganismeService,private sessionStorage:SessionStorageService) { }

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
    }else if(this.search == "3") {
      if (this.checkDate(this.searchStage)) {
        this.stageService.findByDateFin(this.searchStage, this.page, this.size);
      }
    }else if(this.search == "4") {
      this.searchedStage.organismeAccueil.raisonSociale = this.searchStage;
        this.stageService.findByOrganisme(this.page,this.size);
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
  get selectedStages(){
    return this.stageService.selectedStages;
  }
  addToSelectedStages(stage:Stage){
    const contain = this.selectedStages.filter(s=>s.id == stage.id);
    if(contain.length == 0){
      this.selectedStages.push(stage);
    }else{
      const index = this.selectedStages.indexOf(stage,0);
      this.deleteFromSelectedStages(index);
    }
  console.log(this.selectedStages);
  }
  deleteFromSelectedStages(i:number){
    this.selectedStages.splice(i,1);
  }
  addAllToSelectedStages(){
    this.selectAll =!this.selectAll;
    if(this.selectAll){
      this.stagePage.content.forEach(stage=>this.selectedStages.push(stage));
    }else {
      this.selectedStages.splice(0,this.selectedStages.length);
    }
    console.log(this.selectedStages);
  }
  existeInSelectedStage(stage){
    const contain = this.selectedStages.filter(s=>s.id == stage.id);
    if(contain.length == 0){
      return false;
    }else{
      return true;
    }
  }
  changeOrder(order:string,prop:string){
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }
  setStageRef(ref:string){
    this.rapportService.stageRef = ref;
  }
  diaplayRapport(rapport:Rapport){
    this.rapportService.rapport = rapport;
  }
  activerStage(ref:string){

  }
  ajouterStructure(stage:Stage){
    this.stageService.stage= stage;
  }
  showEtudiants(id:number){
    if(this.showEtudiant.show){
      this.showEtudiant.id =0;
    }else{
      this.showEtudiant.id = id;
    }
      this.showEtudiant.show = !this.showEtudiant.show;

  }
  showEncadreurs(id:number){
    if(this.showEncadrant.show){
      this.showEncadrant.id =0;
    }else{
      this.showEncadrant.id = id;
    }
    this.showEncadrant.show = !this.showEncadrant.show;
  }
  showJuries(id:number){
    if(this.showjury.show){
      this.showjury.id =0;
    }else{
      this.showjury.id = id;
    }
    this.showjury.show = !this.showjury.show;
  }
  stageView(stage:Stage){
    this.sessionStorage.store("stageToView",stage);
  }
  get organismeAccueil(){
    return this.organismeService.organismeAcceuil;
  }

}
