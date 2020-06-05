import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {SessionStorageService} from "ngx-webstorage";
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

  fileInfos: Observable<any>;
  rapportForm;
  constructor(private stageService:StageService,private sessionStorage:SessionStorageService,private etudiantService:EtudiantService,
              private encadreurService:EncadreurService,private passwordGeneratorService:PasswordGeneratorService,private juryService:JuryService,
              private organismeService:OrganismeService) { }

  ngOnInit(): void {

    console.log(this.sessionStorage.retrieve("stageToView"));

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
    this.encadreurs[i].user.motPass = this.passwordGeneratorService.getRandomPassword();
  }
  generateJuryPWD(i){
    this.juries[i].user.motPass = this.passwordGeneratorService.getRandomPassword();
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
      this.encadreurs.push(this.cloneEncadreur(e));
    }
  }
  cloneEncadreur(encadreur:Encadreur){
    return this.encadreurService.cloneEncadreur(encadreur);
  }
  decreaseEncadreur(i:number){
    this.encadreurs.splice(i,1);
  }
  get jury(){
    return this.juryService.jury;
  }
  ajouterJury(){
    this.ajouterJuries = true;
     this.juries.push(this.cloneJury(new MembreJury()));
    console.log(this.ajouterJuries)
    console.log(this.stage.stageMembreJuries);
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
    console.log(this.stage);
  }

}
