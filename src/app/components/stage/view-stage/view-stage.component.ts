import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {Encadreur} from "../../../models/encadreur.model";
import {JuryService} from "../../../services/jury.service";
import {MembreJury} from "../../../models/membre-jury.model";
import {OrganismeService} from "../../../services/organisme.service";
import {Observable} from "rxjs";
import {OrganismeAccueil} from "../../../models/organisme-accueil.model";
import {Stage} from "../../../models/stage.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {StageMembreJury} from "../../../models/stage-membre-jury.model";
import {StageEncadreur} from "../../../models/stage-encadreur.model";

@Component({
  selector: 'app-view-stage',
  templateUrl: './view-stage.component.html',
  styleUrls: ['./view-stage.component.css']
})
export class ViewStageComponent implements OnInit {
  updateStage = {
    stage:false,
    etudiants:false,
    encadreurs:false,
    juries:false,
    organisme:false,
    rapport:false
  }
  juryRoles = [];
  ajouterEtudiant = false;
  ajouterEncadreurs = false;
  ajouterJuries = false;
  typeEnc:string="--Type Encadreur--";
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  role = ""
  stageJuries:Array<StageMembreJury> = new Array<StageMembreJury>();
  stageEncadreurs:Array<StageEncadreur> = new Array<StageEncadreur>();
  fileInfos: Observable<any>;
  rapportForm;
  constructor(private stageService:StageService,private sessionStorage:LocalStorageService,private etudiantService:EtudiantService,
              private encadreurService:EncadreurService,private passwordGeneratorService:PasswordGeneratorService,private juryService:JuryService,
              private organismeService:OrganismeService,private flashMessagesService:FlashMessagesService) { }

  ngOnInit(): void {
    console.log(this.checkExpiredStage())
    console.log(this.sessionStorage.retrieve("stageToView"));
    const user = this.sessionStorage.retrieve("logedUser");
    this.role = user.roles[0].role;

  }
checkExpiredStage(){
  console.log(this.stage.dateSoutenance)
    if((this.stage.dateSoutenance == undefined || this.stage.dateSoutenance == null) && !this.checkFinStage()) return false;
    else{
      let dateSout = new Date(this.stage.dateSoutenance);
      let current = new Date();
      if(dateSout.getTime()<current.getTime()) return true;
      else  return false;
    }
}
  checkFinStage(){
    let timeFinStage = new Date(this.stage.dateFin);
    let dateCurrent = new Date;
    let currentTime = dateCurrent.getTime();
    if(currentTime>timeFinStage.getTime()) return true;
    else return  false;
  }
  get stage():Stage{
    return this.sessionStorage.retrieve("stageToView");
  }
  findEtudiantByCin() {
    if(this.etudiant.cin){
      this.etudiantService.findByCin(this.etudiant.cin)
    }

  }
  get etudiant(){
    return this.etudiantService.etudiant;
  }
  get encadreurs(){
    return this.encadreurService.encadreurs;
  }
  generateP(i:number){
    this.encadreurs[i].user.password = this.passwordGeneratorService.getRandomPassword();
  }
  generateJuryPWD(i){
    this.stageJuries[i].membreJury.user.password = this.passwordGeneratorService.getRandomPassword();
  }
  increaseEncadrants(){
    if(this.stage.stageEncadreurs.length<2){
      this.ajouterEncadreurs =true;
      const e = new Encadreur();
      e.type = this.typeEnc;
      if(this.typeEnc == "Encadreur de l'organisme"){
        const  d = new Date();
        e.reference = "EO"+d.getTime();
      }
      let se = new StageEncadreur();
      se.encadreur = this.cloneEncadreur(e);
      this.stageEncadreurs.push(se);
    }
  }
  cloneEncadreur(encadreur:Encadreur){
    return this.encadreurService.cloneEncadreur(encadreur);
  }
  decreaseEncadreur(i:number){
    this.stageEncadreurs.splice(i,1);
  }
  get jury(){
    return this.juryService.jury;
  }
  ajouterJury(){
    this.ajouterJuries = true;
    let sm = new StageMembreJury();

    sm.membreJury = this.cloneJury(new MembreJury());
    this.stageJuries.push(sm);

  }
  get juries(){
    return this.juryService.juries;
  }
  cloneJury(j:MembreJury){
    return this.juryService.cloneJury(j);
  }
  get typeOrganismes(){
    return this.organismeService.typeOrganismes;
  }
  get typeServiceOrganismes(){
    return this.organismeService.typeServiceOrganismes;
  }
  get villes(){
    return this.organismeService.villes;
  }
  get pays(){
    return this.organismeService.pays;
  }

  update(){
    console.log(this.stage)
    this.stage.stageEncadreurs.forEach(se=>{
      if(se.encadreur.type != "Encadreur de la faculté" && se.encadreur.reference == undefined){
      se.encadreur.reference = "EO"+this.getTime();
      }
    })
    this.stage.stageMembreJuries.forEach(sm=>{
      if(sm.membreJury.reference == undefined || sm.membreJury.reference == ""){
        sm.membreJury.reference = "J"+this.getTime();
      }
    })
    this.stageService.update(this.stage).subscribe(resp=>{
      console.log(resp)
      if(resp>0){
        this.flashMessagesService.show('stage est modifier  avec succée!', { cssClass: 'alert-success', timeout: 6000 })
        this.sessionStorage.store('stageToView',this.stage)
      }else{
        this.flashMessagesService.show('Erreur dans la modification!', { cssClass: 'alert-danger', timeout: 6000 })
      }
    })
  }

  getTime(){
    let date = new Date();
    return date.getTime();
  }

  removeJury(i: number) {
    this.stageJuries.splice(i,1);

  }

  addToStage(i: number) {
    console.log(this.validateJury(this.stageJuries[i].membreJury))
    if(!this.validateJury(this.stageJuries[i].membreJury)){
      this.stage.stageMembreJuries.push(this.stageJuries[i]);
      this.stageJuries.splice(i,1);
    }
  }

  validateJury(jury:MembreJury){
    return jury.user.nom.length == 0 || jury.user.prenom.length == 0 || jury.user.username.length == 0 || jury.user.username.length == 0;
  }
}
