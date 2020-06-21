import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {JuryService} from "../../../services/jury.service";
import {Encadreur} from "../../../models/encadreur.model";
import {StageEtudiant} from "../../../models/stage-etudiant.model";
import {StageEncadreur} from "../../../models/stage-encadreur.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {OrganismeService} from "../../../services/organisme.service";
import {OrganismeAccueil} from "../../../models/organisme-accueil.model";
import {Stage} from "../../../models/stage.model";
import {CoordinateurService} from "../../../services/coordinateur.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-stage-create',
  templateUrl: './stage-create.component.html',
  styleUrls: ['./stage-create.component.css']
})
export class StageCreateComponent implements OnInit {
  ajouterSujet = false;
  ajouterStructure = false;
  ajouterEncadreur = false;
  stage:Stage  = new Stage();
  typeEnc:string="--Type Encadreur--";
  constructor(private stageService: StageService,private etudiantService: EtudiantService,private encadreurService:EncadreurService,
              private juryService:JuryService,private flashMessagesService:FlashMessagesService,private passwordGeneratorService:PasswordGeneratorService
              ,private organismeService:OrganismeService,private coordinateurService:CoordinateurService,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    this.coordinateurService.findByUserId(user.id).subscribe(coord=>{
      this.etudiantService.findByFiliere(coord.filiere.id);
      this.organismeService.findByFiliere(coord.filiere.id);
      this.encadreurService.findByFiliere(coord.filiere.id);
    })

    this.stage.stageEtudiants = [];
    this.etudiants.push(this.etudiant);
    this.coordinateurService.getCoordinateur();
  }

  increaseEtudiants(){
    this.etudiants.push(this.cloneEtudiant(new Etudiant()));
  }
  increaseEncadrants(){
	if(this.typeEnc != "--Type Encadreur--"){
	 this.ajouterEncadreur = true;
    const e = new Encadreur();
    e.type = this.typeEnc;
    if(this.typeEnc == "Encadreur de l'organisme"){
      const  d = new Date();
      e.reference = "EO"+d.getTime();
    }
    this.encadreurs.push(this.cloneEncadreur(e));
	}
  }
  decreaseEtudiant(i:number){
      this.etudiants.splice(i,1);
  }

  get fEncadreurs(){
    return this.encadreurService.fEncadreurs;
  }
  get fEtudiants(){
    return this.etudiantService.fEtudiants
  }
  get organismes(){
    return this.organismeService.organismeAcceuils;
  }
  decreaseEncadreur(i:number){
      this.encadreurs.splice(i,1);
      if(this.encadreurs.length == 0) this.ajouterSujet = false;
  }
  get etudiants(){
    return this.etudiantService.etudiants;
  }
  get etudiant(){
    return this.etudiantService.etudiant;
  }
  get encadreur(){
    return this.encadreurService.encadreur;
  }
  get encadreurs(){
    return this.encadreurService.encadreurs;
  }
  cloneEtudiant(etudiant:Etudiant){
   return this.etudiantService.cloneEtudiant(etudiant);
  }
  cloneEncadreur(encadreur:Encadreur){
    return this.encadreurService.cloneEncadreur(encadreur);
  }
  ceateStage(){
    this.etudiants.forEach(e=>{
      if(e.cin){
        const se = new StageEtudiant();
        e.filiere.id = 1;
        se.etudiant = e;
        this.stage.stageEtudiants.push(se);
      }
    });
    this.encadreurs.forEach(e=>{
      if(e.reference){
        const se = new StageEncadreur();
        se.encadreur = e;
        this.stage.stageEncadreurs.push(se);
      }
    })
    const user = this.localStorage.retrieve('logedUser')
    this.coordinateurService.findByUserId(user.id).subscribe(coord=>{
      this.stage.coordinateur= coord
      this.stageService.save(this.stage).subscribe(resp=>{
        console.log(this.stage)
        console.log(resp)
        if(resp>0){
          this.flashMessagesService.show('stage est crée avec succée!', { cssClass: 'alert-success', timeout: 6000 })
          this.stage = new Stage();
          this.etudiantService.etudiants = new Array<Etudiant>();
          this.encadreurService.encadreurs = new Array<Encadreur>();
          this.stage.organismeAccueil =  null;
        }else{
          this.flashMessagesService.show('il y\'a un problème dans la création du stage! ', { cssClass: 'alert-danger', timeout: 6000 })
        }
      });

    });
    console.log(this.stage);

  }
  findEtudiantByCin(i:number) {
      if(this.etudiants[i].cin ){
        this.etudiantService.findByCin(this.etudiants[i].cin)
        this.etudiants[i] = this.etudiant;
      }
  }
  generateP(i:number){
      this.encadreurs[i].user.password = this.passwordGeneratorService.getRandomPassword();
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
  initOrganisation(){
    this.stage.organismeAccueil.ville.nom = this.stage.organismeAccueil.typeOrganisme.type = this.stage.organismeAccueil.typeServiceOrganisme.type =this.stage.organismeAccueil.ville.pays.nom= "--SELECT--"
  }
  toggleOrganisme(){

    this.ajouterStructure =!this.ajouterStructure;
    if(this.ajouterStructure){
      this.organismeService.findAllPays();
      this.organismeService.findAllTypeOrganisme();
      this.organismeService.findAllTypeServiceOrganisme();
      this.organismeService.findAllVille();
      this.stage.organismeAccueil = new OrganismeAccueil();
      this.initOrganisation();
    }else{
      this.stage.organismeAccueil = null;
    }
  }
  validateInputs() {
    return this.stage.dateDebut  && this.stage.dateFin && this.validateEtuiants() && this.validateEncadreurs();
  }
  validateOrganisme(){
    if(this.stage.organismeAccueil != null){
      const o = this.stage.organismeAccueil;
      return o.raisonSociale && o.adress && o.email && o.responsable && o.tele && o.teleFix && o.typeOrganisme.type !="--SELECT--" && o.typeServiceOrganisme.type != "--SELECT--" && o.ville.nom != "--SELECT--" && o.ville.pays.nom !="--SELECT--";
    }else{
      return true;
    }

  }
  validateEtuiants(){

    for(let i = 0;i<this.etudiants.length;i++) {
      if((this.etudiants[i].cin == undefined  || this.etudiants[i].cin.length != 10) || (this.etudiants[i].codeAppoge == undefined  || this.etudiants[i].codeAppoge.length ==0)
        || (this.etudiants[i].user.nom == undefined || this.etudiants[i].user.nom.length==0) || (this.etudiants[i].user.prenom == undefined  || this.etudiants[i].user.prenom.length==0)){
        return false;
      }
    }
      return true;
  }

  validateEncadreurs(){
    if(this.encadreurs.length == 0) return  true;
    for(let i = 0;i<this.encadreurs.length;i++){
      if(((this.encadreurs[i].reference == undefined || this.encadreurs[i].reference.length == 0) ||(this.encadreurs[i].user.nom == undefined  || this.encadreurs[i].user.nom.length ==0) ||
        (this.encadreurs[i].user.prenom == undefined  || this.encadreurs[i].user.prenom.length == 0) || (this.encadreurs[i].user.username == undefined  || this.encadreurs[i].user.username.length == 0)) ||
        (this.encadreurs[i].user.password  == undefined  || this.encadreurs[i].user.password.length == 0)){
        return false;
      }
    }
      return true;
  }

  choisirEtud(e:Etudiant){
    if(this.etudiants.length<2){
      if(!this.validateEtuiants()){
        this.etudiants.splice(0,1);
      }
      this.etudiants.push(e);
    }
  }
  choisirEnca(e:Encadreur){
    if(this.encadreurs.length<2){
      this.ajouterEncadreur = true;
      this.encadreurs.push(e);
      console.log(this.encadreurs)
    }
  }
  addOrg(o:OrganismeAccueil){
    this.stage.organismeAccueil = o;

  }

}

