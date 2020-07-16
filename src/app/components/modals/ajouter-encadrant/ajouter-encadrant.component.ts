import {Component, OnInit} from '@angular/core';
import {EncadreurService} from "../../../services/encadreur.service";
import {StageService} from "../../../services/stage.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Encadreur} from "../../../models/encadreur.model";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {StageEncadreur} from "../../../models/stage-encadreur.model";

@Component({
  selector: 'app-ajouter-encadrant',
  templateUrl: './ajouter-encadrant.component.html',
  styleUrls: ['./ajouter-encadrant.component.css']
})
export class AjouterEncadrantComponent implements OnInit {
  email;
  newEnca  = false;
  oldEnca = false;
  encadreur:Encadreur = new Encadreur();
  constructor(private encadreurService: EncadreurService, private stageService: StageService, private flashMessagesService: FlashMessagesService,
              private passwordGeneratorService:PasswordGeneratorService) {
  }

  ngOnInit(): void {
    this.encadreur.type = "Encadreur de l'organisme";
  }

  fetchEncadrant() {
    this.encadreurService.fetchEncadrant(this.email).subscribe(enca => {
      if(enca != null){
        this.encadreur = enca;
        this.oldEnca = true;
      }else{
        this.newEnca = true;
      }
    })
  }

  generate(){
    this.encadreur.user.password = this.passwordGeneratorService.getRandomPassword();
  }

  get stage(){
    return this.stageService.stage;
  }

  ajouter(){
    const  se = new StageEncadreur();
    se.encadreur = this.encadreur;
    this.stage.stageEncadreurs.push(se);
    this.stageService.update(this.stage).subscribe(resp=>{
      if(resp>0){
        this.flashMessagesService.show("Encadrant de l'organisme est ajouter avec succès!", {
          cssClass: 'alert-success',
          timeout: 5000
        });
      }else{
        this.flashMessagesService.show("Erreur dans l'ajout de l'encadrant!", {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    },error => {
      this.flashMessagesService.show("Erreur est survenu!", {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    })
  }
  validate(){
    if(this.newEnca){
      return (!this.email || this.email.lenght == 0) || (!this.encadreur.user.nom || this.encadreur.user.nom.length == 0 ) ||
        (!this.encadreur.user.nom || this.encadreur.user.nom.length == 0 ) || (!this.encadreur.user.password || this.encadreur.user.password.length == 0 )
        || (!this.encadreur.user.tele || this.encadreur.user.tele.length < 10);
    }
    if(this.oldEnca){
      return false;
    }
  }
}
