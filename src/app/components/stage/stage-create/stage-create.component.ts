import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {JuryService} from "../../../services/jury.service";
import {Encadreur} from "../../../models/encadreur.model";
import {StageEtudiant} from "../../../models/stage-etudiant.model";
import {StageEncadreur} from "../../../models/stage-encadreur.model";
import {FlashMessagesService} from "angular2-flash-messages";
import * as generatePassword from "generate-password/src/generate"
@Component({
  selector: 'app-stage-create',
  templateUrl: './stage-create.component.html',
  styleUrls: ['./stage-create.component.css']
})
export class StageCreateComponent implements OnInit {
  ajouterSujet = false;
  ajouterStructure = false;
  constructor(private stageService: StageService,private etudiantService: EtudiantService,private encadreurService:EncadreurService,
              private juryService:JuryService,private flashMessagesService:FlashMessagesService) { }

  ngOnInit(): void {
    this.etudiants.push(this.etudiant);
    this.encadreurs.push(this.encadreur);

  }
  showFlash() {
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessagesService.show('stage est crée avec succée', { cssClass: 'alert-success', timeout: 2000 });
  }
  get stage(){
    return this.stageService.stage;
  }


  increaseEtudiants(){
    this.etudiants.push(this.cloneEtudiant(new Etudiant()));
    console.log(this.etudiants);
  }
  increaseEncadrants(){
    this.encadreurs.push(this.encadreur);
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
    const ge= generatePassword.generate(
      {
        length: 10,
        numbers: true,
      },

    )
    this.encadreurs[i].utilisateur.motPass = ge;
  }

}
