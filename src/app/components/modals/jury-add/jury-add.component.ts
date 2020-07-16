import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {JuryService} from "../../../services/jury.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {CoordinateurService} from "../../../services/coordinateur.service";
import {Encadreur} from "../../../models/encadreur.model";
import {MembreJury} from "../../../models/membre-jury.model";
import {User} from "../../../models/user.model";
import {StageService} from "../../../services/stage.service";
import {StageMembreJury} from "../../../models/stage-membre-jury.model";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-jury-add',
  templateUrl: './jury-add.component.html',
  styleUrls: ['./jury-add.component.css']
})
export class JuryAddComponent implements OnInit {
  ajouterJuries = false;
  type = "";
  stageJuries:Array<StageMembreJury> = new Array<StageMembreJury>();
  constructor(private localStorage:LocalStorageService,private juryService:JuryService,private encadreurService:EncadreurService,private coordinateurService:CoordinateurService,
              private stageService:StageService,private passwordGeneratorService:PasswordGeneratorService,private notificationService:NotificationService) { }

  ngOnInit(): void {

    const user = this.localStorage.retrieve("logedUser");
    this.coordinateurService.findByUserId(user.id).subscribe(coord=>{
      this.encadreurService.findByFiliere(coord.filiere.id);
      this.juryService.findByfiliere(coord.filiere.id);
    })
  }

  get encadreurs():Array<Encadreur>{
    return this.encadreurService.fEncadreurs;
  }

  get juries():Array<MembreJury>{
    return this.juryService.juries;
  }

  check(e:Encadreur){
    for(let i = 0 ;i<this.juries.length;i++){
      if(e.user.username == this.juries[i].user.username){
        return false;
      }
    }
    return  true;
  }

  get stage(){
    return this.stageService.stage;
  }
  addJury(user: User) {
    if(this.stage.stageMembreJuries.length<3){
      let jury  =  new MembreJury();
      jury.user = user;
      jury.reference = "J"+this.getTime();
      let m = new StageMembreJury();
      m.membreJury = jury;
      m.role = this.type;
      this.stage.stageMembreJuries.push(m);
    }
  }
  affecter(){
    this.stage.stageMembreJuries.forEach(sj=>{
      if(sj.membreJury.reference == undefined || sj.membreJury.reference == ""){
        sj.membreJury.reference = "J"+this.getTime();
      }
    })
        this.stageService.update(this.stage).subscribe(resp=>{
          if(resp>0){
            this.notificationService.showSuccess("Le jury est ajouté avec succès","Gestion des jurys")
          }else{
            this.notificationService.showWarning("Erreur dans l'ajout de jury","Gestion des jurys")
          }
        },error => {
          this.notificationService.showError("Erreur est survenu","Gestion des jurys")
        })
  }
  ajouterMembre(){
    if(this.stage.stageMembreJuries.length+this.stageJuries.length<3){
      this.ajouterJuries = !this.ajouterJuries;
      let j = new StageMembreJury();
      this.stageJuries.push(j);
    }
  }
  addJuryJ(j:MembreJury){
    if(this.stage.stageMembreJuries.length<3){
      let sm = new StageMembreJury();
      sm.role = this.type;
      sm.membreJury = j;
      this.stage.stageMembreJuries.push(sm);
    }
  }
  generateJuryPWD(i){
    this.stageJuries[i].membreJury.user.password = this.passwordGeneratorService.getRandomPassword();
  }
  addToStage(i){
  if(this.stage.stageMembreJuries.length<3){
    this.stage.stageMembreJuries.push(this.stageJuries[i]);
  }
  }
  removeJury(i){
    this.stageJuries.splice(i,1);
    return this.stageJuries;
  }
  getTime(){
    let date = new Date();
    return date.getTime();
  }
}
