import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {StageEtudiantService} from "../../../services/stage-etudiant.service";
import {Stage} from "../../../models/stage.model";
import {RapportService} from "../../../services/rapport.service";
import {Rapport} from "../../../models/rapport.model";
import {OrganismeService} from "../../../services/organisme.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ConventionService} from "../../../services/convention.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AlertService} from "../../../services/alert.service";
import {Tache} from "../../../models/tache.model";
import {Router} from "@angular/router";
declare let bootbox:any;
@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.css']
})
export class ListStagesComponent implements OnInit {
  page:number = 0;
  size:number = 10;
  showenStages = "active"
  searching = false;
  search = "-SELECT-";
  searchStage = "";
  modifyEtudiant = false;
  searchByDate = false;
  selectedTable="Stages";
	sort = "desc"
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
    'rapport':false,
    'convention':true
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
  role = ""
  constructor(private stageService: StageService,private stageEtudiantService:StageEtudiantService,
              private rapportService:RapportService,private organismeService:OrganismeService,
              private sessionStorage:LocalStorageService,private conventionService:ConventionService,
              private flashMessagesService:FlashMessagesService,private alertService:AlertService,private  router:Router) { }

  ngOnInit(): void {
    const user = this.sessionStorage.retrieve("logedUser");
    this.role = user.roles[0].role;
	console.log(user);
	console.log(this.role);
    if(this.role == "COORDINATEUR_ROLE"){
      this.findByCoordinateur(user.id);
    }
    if(this.role == "ADMIN_ROLE"){
      this.findAllPages();
    }
    if(this.role == "ETUDIANT_ROLE"){
    console.log("equals")
      this.findByEtudiant(user.id);
    }
    if(this.role == "ENCADREUR_ROLE"){
      this.findByEncadreur(user.id);
    }
    if(this.role == "JURY_ROLE"){
      this.findByJury(user.id);
    }
  }
  deleteStage(stage:Stage){
      this.stageService.deleteByReference(stage.reference).subscribe(resp=>{
        if(resp>0){
          this.flashMessagesService.show("stage supprimer avec succée!", { cssClass: 'alert-success', timeout: 5000 });
          this.stageService.stagePage.content.splice(this.stagePage.content.indexOf(stage,0),1);
        }else{
          this.flashMessagesService.show("stagee ne peut pas être suprpimer!!", { cssClass: 'alert-danger', timeout: 5000 });
        }
      });

  }
  findByEtudiant(id:number){
    return this.stageService.findByEtudiantId(id,this.page,this.size);
  }
  findByJury(id:number){
    return this.stageService.findByJuryId(id,this.page,this.size);
  }
  findByEncadreur(id:number){
    return this.stageService.findByEncadreurId(id,this.page,this.size);
  }
  findByCoordinateur(id:number){
    return this.stageService.findByCoordinateurId(id,this.page,this.size,this.sort);
  }
  plannig(){
    this.stageService.stages = this.stagePage.content;
  }
  conventioner(cStage:Stage){
    if(this.validateConvention(cStage)){
      this.chargerConvention();
    }else{
      this.conventionSet(cStage);
    }
  }

  conventionSet(cStage:Stage){
    this.conventionService.convention.organisme = cStage.organismeAccueil;
    this.conventionService.convention.dateDebutStage = this.getFormatDate(cStage.dateDebut);
    this.conventionService.convention.dateFinStage = this.getFormatDate(cStage.dateFin);
    this.conventionService.convention.durreStage = this.getDiffMonth(cStage.dateDebut,cStage.dateFin);
    cStage.stageEtudiants.forEach(se=>{
      this.conventionService.convention.etudiantCne.push(se.etudiant.cin);
    })

    cStage.stageEncadreurs.forEach(se=>{
      if(se.encadreur.type == "Encadreur de la faculté"){
        this.conventionService.convention.encadreurFaculte = se.encadreur;
      }else{
        this.conventionService.convention.encadreurStructure = se.encadreur;
      }
    })
    this.conventionService.convention.sujetStage = cStage.sujet;
    console.log(this.conventionService.convention);
  }

  chargerConvention = () =>{
    bootbox.confirm({
      message: "les champ du convention sont incomplte penser modifier le stage en ajoutant les information neccessaires! ",
      buttons: {
        confirm: {
          label: 'Annuler',
          className: 'btn-info'
        }
      }
    });
  }
  validateConvention(stage:Stage){
    return !stage.sujet || stage.stageEncadreurs.length <2 || !stage.organismeAccueil.email || !stage.organismeAccueil.responsable ||
      !stage.organismeAccueil.teleFix || !stage.organismeAccueil.raisonSociale || !stage.organismeAccueil.tele;
  }
  delete = (stage:Stage) =>{
    bootbox.confirm({
      message: "Vous voulez vraiment supprimer ce stage?",
      buttons: {
        confirm: {
          label: 'Confirmer',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler',
          className: 'btn-danger'
        }
      },
      callback:(result)=>{
        if(result){
          console.log("inside arrow")
          this.deleteStage(stage);
        }
      }
    })
  }
  getFormatDate(d:Date):string{
    let date = new Date(d);
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    return day + "/"+month+"/"+year;
  }
  getDiffMonth(date1:Date,date2:Date){
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let months;
    months = (d2.getFullYear() - d1.getFullYear())*12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
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
    this.router.navigate(['coordinateur/stage']);
  }
  get organismeAccueil(){
    return this.organismeService.organismeAcceuil;
  }

  deleteAll = () =>{
    bootbox.confirm({
      message: "Vous voulez vraiment supprimer ce stage?",
      buttons: {
        confirm: {
          label: 'Confirmer',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler',
          className: 'btn-danger'
        }
      },
      callback:(result)=>{
        if(result){
          this.selectedStages.forEach(stage=>{
            this.deleteStage(stage);
          })
        }
      }
    })

  }
  activateAll(){
    this.selectedStages.forEach(stage=>{
      this.activerStage(stage);
    })
  }
  activerStage(stage:Stage){
    this.stageService.activerStage(stage.reference).subscribe(resp=>{
      if(resp>0){
        this.flashMessagesService.show("stage activer avec succée!", { cssClass: 'alert-success', timeout: 5000 });
        this.stagePage.content.forEach(s=>{
          if(s.reference == stage.reference){
            s.statu = true;
          }
        })
      }else{
        this.flashMessagesService.show("stagee ne peut pas être activer!!", { cssClass: 'alert-danger', timeout: 5000 });
      }
    })
  }
}
