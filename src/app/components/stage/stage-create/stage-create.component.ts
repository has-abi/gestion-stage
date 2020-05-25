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
import * as jsPDF from 'jspdf';
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {OrganismeService} from "../../../services/organisme.service";
import {OrganismeAccueil} from "../../../models/organisme-accueil.model";

@Component({
  selector: 'app-stage-create',
  templateUrl: './stage-create.component.html',
  styleUrls: ['./stage-create.component.css']
})
export class StageCreateComponent implements OnInit {
  ajouterSujet = false;
  ajouterStructure = false;
  typeEnc:string="--Type Encadreur--";
  constructor(private stageService: StageService,private etudiantService: EtudiantService,private encadreurService:EncadreurService,
              private juryService:JuryService,private flashMessagesService:FlashMessagesService,private passwordGeneratorService:PasswordGeneratorService
              ,private organismeService:OrganismeService) { }

  ngOnInit(): void {
    this.etudiants.push(this.etudiant);
    this.encadreur.type = "Encadreur de la faculté";
    this.encadreurs.push(this.encadreur);
    this.organismeService.findAllPays();
    this.organismeService.findAllTypeOrganisme();
    this.organismeService.findAllTypeServiceOrganisme();
    this.organismeService.findAllVille();

  }
  @ViewChild('content') content: ElementRef;
  public SavePDF(): void {
    let content=this.content.nativeElement;
    let doc = new jsPDF();
    let _elementHandlers =
      {
        '#editor':function(element,renderer){
          return true;
        }
      };
    doc.fromHTML(content.innerHTML,15,15,{

      'width':190,
      'elementHandlers':_elementHandlers
    });

    doc.save('test.pdf');
  }

  get stage(){
    return this.stageService.stage;
  }


  increaseEtudiants(){
    this.etudiants.push(this.cloneEtudiant(new Etudiant()));
    console.log(this.etudiants);
  }
  increaseEncadrants(){
    const e = new Encadreur();
    e.type = this.typeEnc;
    if(this.typeEnc == "Encadreur de l'organisme"){
      const  d = new Date();
      e.reference = "EO"+d.getTime();
    }
    this.encadreurs.push(this.cloneEncadreur(e));
    console.log(this.encadreurs)
  }
  decreaseEtudiant(i:number){
      this.etudiants.splice(i,1);

  }
  decreaseEncadreur(i:number){
      this.encadreurs.splice(i,1);
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
      const se = new StageEtudiant();
      e.filiere.id = 1;
      se.etudiant = e;
      //pour le test
      this.stage.stageEtudiants.push(se);
    });
    this.encadreurs.forEach(e=>{
      if(e.reference){
        const se = new StageEncadreur();
        se.encadreur = e;
        this.stage.stageEncadreurs.push(se);
      }
    })

    this.stageService.save();
    this.flashMessagesService.show('stage est crée avec succée', { cssClass: 'alert-success', timeout: 6000 });
  }
  findEtudiantByCin(i:number) {
      if(this.etudiants[i].cin ){
        this.etudiantService.findByCin(this.etudiants[i].cin)
        this.etudiants[i] = this.etudiant;
      }
  }
  generateP(i:number){
      this.encadreurs[i].user.motPass = this.passwordGeneratorService.getRandomPassword();
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
    this.stage.organismeAccueil.ville.nom = this.stage.organismeAccueil.typeOrganisme.type = this.stage.organismeAccueil.typeServiceOrganisme.type = "--SELECT--"
  }
  toggleOrganisme(){
    this.ajouterStructure =!this.ajouterStructure;
    if(this.ajouterStructure){
      this.stage.organismeAccueil = new OrganismeAccueil();
      this.initOrganisation();
    }else{
      this.stage.organismeAccueil = null;
    }
  }
}
